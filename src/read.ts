
/* IMPORT */

import Int32 from 'int32-encoding';
import U8 from 'uint8-encoding';
import toHex from 'uint8-to-hex';
import fs from 'node:fs';
import get from './get';
import {basename} from './utils';
import type {FileDecoded} from './types';

/* HELPERS */

const CACHE: Record<string, FileDecoded> = {};

/* MAIN */

const read = ( archivePath: string, archiveFile: string ): FileDecoded | undefined => {

  const fd = fs.openSync ( archivePath, 'r' );

  try {

    const hashU8 = new Uint8Array ( 32 );
    fs.readSync ( fd, hashU8, 0, 32, 0 );

    const hash = toHex ( hashU8 );
    const cached = CACHE[hash];

    if ( cached ) return cached;

    const headerLengthU8 = new Uint8Array ( 4 );
    fs.readSync ( fd, headerLengthU8, 0, 4, 32 );

    const headerLength = Int32.decode ( headerLengthU8 );
    const headerU8 = new Uint8Array ( headerLength );
    fs.readSync ( fd, headerU8, 0, headerLength, 32 + 4 );

    const header = U8.decode ( headerU8 );
    const folder = JSON.parse ( header );

    const encoded = get.encoded ( folder, archiveFile );

    if ( !encoded ) return;

    const {offset, size, ...base} = encoded;
    const content = new Uint8Array ( size );
    fs.readSync ( fd, content, 0, size, 32 + 4 + headerLength + offset );

    const name = basename ( archiveFile );
    const path = archiveFile.replaceAll ( '\\', '/' );
    const decoded: FileDecoded = { ...base, name, path, content };

    CACHE[hash] = decoded;

    return decoded;

  } finally {

    fs.closeSync ( fd );

  }

};

/* EXPORT */

export default read;
