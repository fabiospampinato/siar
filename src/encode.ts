
/* IMPORT */

import {sha256} from 'crypto-sha';
import Int32 from 'int32-encoding';
import concat from 'uint8-concat';
import U8 from 'uint8-encoding';
import type {FolderEncoded} from './types';

/* MAIN */

const encode = async ( folder: FolderEncoded, contents: Uint8Array[] ): Promise<Uint8Array> => {

  const hashPlaceholder = new Uint8Array ( 32 );
  const header = JSON.stringify ( folder );
  const headerU8 = U8.encode ( header );
  const headerLength = headerU8.byteLength;
  const headerLengthU8 = Int32.encode ( headerLength );
  const archive = concat ([ hashPlaceholder, headerLengthU8, headerU8, ...contents ]);
  const hash = await sha256.uint8 ( archive );

  archive.set ( hash, 0 );

  return archive;

};

/* EXPORT */

export default encode;
