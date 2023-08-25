
/* IMPORT */

import Int32 from 'int32-encoding';
import U8 from 'uint8-encoding';
import fs from 'node:fs';
import get from './get';
import {basename} from './utils';
import type {FileDecoded} from './types';

/* MAIN */

//TODO: Use a nonce for caching

const read = ( archivePath: string, archiveFile: string ): FileDecoded | undefined => {

  const fd = fs.openSync ( archivePath, 'r' );

  try {

    const headerLengthU8 = new Uint8Array ( 4 );
    fs.readSync ( fd, headerLengthU8, 0, 4, 0 );

    const headerLength = Int32.decode ( headerLengthU8 );
    const headerU8 = new Uint8Array ( headerLength );
    fs.readSync ( fd, headerU8, 0, headerLength, 4 );

    const header = U8.decode ( headerU8 );
    const folder = JSON.parse ( header );

    const encoded = get.encoded ( folder, archiveFile );

    if ( !encoded ) return;

    const {offset, size, ...base} = encoded;
    const content = new Uint8Array ( size );
    fs.readSync ( fd, content, 0, size, 4 + headerLength + offset );

    const name = basename ( archiveFile );
    const path = archiveFile.replaceAll ( '\\', '/' );
    const decoded: FileDecoded = { ...base, name, path, content };

    return decoded;

  } finally {

    fs.closeSync ( fd );

  }

};

/* EXPORT */

export default read;
