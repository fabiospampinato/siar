
/* IMPORT */

import Int32 from 'int32-encoding';
import U8 from 'uint8-encoding';
import type {FolderEncoded} from './types';

/* MAIN */

//TODO: Cache this on the archive with a WeakMap, to speed-up multiple get calls

const decode = ( archive: Uint8Array ): [folder: FolderEncoded, contents: Uint8Array] => {

  const headerLengthU8 = archive.subarray ( 0, 4 );
  const headerLength = Int32.decode ( headerLengthU8 );
  const headerU8 = archive.subarray ( 4, 4 + headerLength );
  const header = U8.decode ( headerU8 );
  const folder = JSON.parse ( header );
  const contents = archive.subarray ( 4 + headerLength );

  return [folder, contents];

};

/* EXPORT */

export default decode;
