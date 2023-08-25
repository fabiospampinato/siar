
/* IMPORT */

import encode from './encode';
import type {FileDescriptor, FolderEncoded} from './types';

/* MAIN */

const make = ( files: Record<string, FileDescriptor> ): Uint8Array => {

  const folder: FolderEncoded = {};
  const contents: Uint8Array[] = [];

  let length = 0;

  for ( const path in files ) {

    const file = files[path];
    const {content, ...base} = file;
    const offset = length;
    const size = content.byteLength;
    const parts = path.split ( /\\|\//g );

    parts.reduce ( ( current, name, i ) => {

      if ( i === parts.length - 1 ) { // File

        current.files ||= {};
        current.files[name] = { ...base, offset, size };

        contents.push ( file.content );
        length += size;

        return current;

      } else { // Dir

        current.dirs ||= {};
        current.dirs[name] ||= {};

        return current.dirs[name];

      }

    }, folder );

  };

  return encode ( folder, contents );

};

/* EXPORT */

export default make;
