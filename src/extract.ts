
/* IMPORT */

import {exit} from 'specialist';
import read from './read';
import restore from './restore';

/* MAIN */

const extract = ( archivePath: string, archiveFile: string, outputFile: string ): void => {

  const decoded = read ( archivePath, archiveFile );

  if ( !decoded ) return exit ( `File not found: "${archiveFile}"` );

  restore ( outputFile, decoded );

};

/* EXPORT */

export default extract;
