
/* IMPORT */

import fs from 'node:fs';
import get from './get';
import type {FileDecoded} from './types';

/* MAIN */

//TODO: Write an optimized version of this for Node, otherwise random-access is not worth much, though this command shouldn't be used frequently anyway

const read = ( archivePath: string, archiveFile: string ): FileDecoded | undefined => {

  const archive = fs.readFileSync ( archivePath );
  const decoded = get ( archive, archiveFile );

  return decoded;

};

/* EXPORT */

export default read;
