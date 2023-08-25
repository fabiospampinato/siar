
/* IMPORT */

import fs from 'node:fs';
import {exit} from 'specialist';
import get from './get';
import restore from './restore';

/* MAIN */

//TODO: Write an optimized version of this for Node, otherwise random-access is not worth much, though this command shouldn't be used frequently anyway

const extract = ( archivePath: string, archiveFile: string, outputFile: string ): void => {

  const archive = fs.readFileSync ( archivePath );
  const decoded = get ( archive, archiveFile );

  if ( !decoded ) return exit ( `File not found: "${archiveFile}"` );

  restore ( outputFile, decoded );

};

/* EXPORT */

export default extract;
