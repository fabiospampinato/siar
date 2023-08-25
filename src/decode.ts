
/* IMPORT */

import Int32 from 'int32-encoding';
import U8 from 'uint8-encoding';
import {weakMemoize} from './utils';
import type {FolderEncoded} from './types';

/* MAIN */

//TODO: Maybe check hashes for integrity

const decode = weakMemoize (( archive: Uint8Array ): [folder: FolderEncoded, contents: Uint8Array] => {

  const hash = archive.subarray ( 0, 32 );
  const headerLengthU8 = archive.subarray ( 32, 32 + 4 );
  const headerLength = Int32.decode ( headerLengthU8 );
  const headerU8 = archive.subarray ( 32 + 4, 32 + 4 + headerLength );
  const header = U8.decode ( headerU8 );
  const folder = JSON.parse ( header );
  const contents = archive.subarray ( 32 + 4 + headerLength );

  return [folder, contents];

});

/* EXPORT */

export default decode;
