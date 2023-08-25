
/* IMPORT */

import decode from './decode';
import {basename} from './utils';
import type {FileDecoded, FileEncoded, FolderEncoded} from './types';

/* MAIN */

const get = ( archive: Uint8Array, file: string ): FileDecoded | undefined => {

  try {

    const [folder, contents] = decode ( archive );
    const decoded = get.decoded ( folder, contents, file );

    return decoded;

  } catch {

    return;

  }

};

/* UTILS */

get.encoded = ( folder: FolderEncoded, file: string ): FileEncoded | undefined => {

  const parts = file.split ( /\\|\//g );
  const parents = parts.slice ( 0, -1 );
  const name = parts.slice ( -1 )[0];

  let current: FolderEncoded = folder;

  for ( const parent of parents ) {
    const next = current.dirs?.[parent];
    if ( !next ) return;
    current = next;
  }

  return current.files?.[name];

};

get.decoded = ( folder: FolderEncoded, contents: Uint8Array, file: string ): FileDecoded | undefined => {

  const encoded = get.encoded ( folder, file );

  if ( !encoded ) return;

  const {offset, size, ...base} = encoded;
  const content = contents.subarray ( offset, offset + size );
  const path = file.replaceAll ( '\\', '/' );
  const name = basename ( path );
  const decoded: FileDecoded = { ...base, name, path, content };

  return decoded;

};

/* EXPORT */

export default get;
