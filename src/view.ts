
/* IMPORT */

import {exit} from 'specialist';
import U8 from 'uint8-encoding';
import read from './read';

/* MAIN */

const view = ( archivePath: string, archiveFile: string ): void => {

  const decoded = read ( archivePath, archiveFile );

  if ( !decoded ) return exit ( `File not found: "${archiveFile}"` );

  console.log ( U8.decode ( decoded.content ) );

};

/* EXPORT */

export default view;
