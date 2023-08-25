
/* IMPORT */

import fs from 'node:fs';
import get from './get';
import restore from './restore';

/* MAIN */

//TODO: Write an optimized version of this for Node, otherwise random-access is not worth much

const extract = ( archivePath: string, archiveFile: string, outputFile: string ): void => {

  const archive = fs.readFileSync ( archivePath );
  const decoded = get ( archive, archiveFile );

  if ( !decoded ) return;

  restore ( outputFile, decoded );

};

/* EXPORT */

export default extract;
