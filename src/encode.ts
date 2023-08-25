
/* IMPORT */

import Int32 from 'int32-encoding';
import concat from 'uint8-concat';
import U8 from 'uint8-encoding';
import type {FolderEncoded} from './types';

/* MAIN */

const encode = ( folder: FolderEncoded, contents: Uint8Array[] ): Uint8Array => {

  const header = JSON.stringify ( folder );
  const headerU8 = U8.encode ( header );
  const headerLength = headerU8.byteLength;
  const headerLengthU8 = Int32.encode ( headerLength );
  const archive = concat ([ headerLengthU8, headerU8, ...contents ]);

  return archive;

};

/* EXPORT */

export default encode;
