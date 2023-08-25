
/* IMPORT */

import decode from './decode';
import type {FileDecoded, FolderEncoded} from './types';

/* MAIN */

const get = ( archive: Uint8Array, file: string ): FileDecoded | undefined => {

  const [folder, contents] = decode ( archive );
  const parts = file.split ( /\\|\//g );
  const parents = parts.slice ( 0, -1 );
  const name = parts.slice ( -1 )[0];

  let current: FolderEncoded = folder;
  for ( const parent of parents ) {
    const next = current.dirs?.[parent];
    if ( !next ) return;
    current = next;
  }

  const encoded = current.files?.[name];

  if ( !encoded ) return;

  const {offset, size, ...base} = encoded;
  const content = contents.subarray ( offset, offset + size );
  const path = parts.join ( '/' );
  const decoded: FileDecoded = { ...base, name, path, content };

  return decoded;

};

/* EXPORT */

export default get;
