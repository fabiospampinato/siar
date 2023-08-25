
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import type {FileDecoded} from './types';

/* MAIN */

const restore = ( filePath: string, file: FileDecoded ): void => {

  const folderPath = path.dirname ( filePath );

  fs.mkdirSync ( folderPath, { recursive: true } );
  fs.writeFileSync ( filePath, file.content );

  if ( file.mode ) { // Restoring mode

    fs.chmodSync ( filePath, file.mode );

  }

  if ( file.mtime ) { // Restoring mtime

    const time = new Date ( file.mtime );

    fs.utimesSync ( filePath, time, time );

  }

};

/* EXPORT */

export default restore;
