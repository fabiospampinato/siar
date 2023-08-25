
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import restore from './restore';
import visit from './visit';

/* MAIN */

const unpack = ( archivePath: string, folderPath: string ): void => {

  const archive = fs.readFileSync ( archivePath );

  visit ( archive, file => {

    const filePath = path.join ( folderPath, file.path );

    restore ( filePath, file );

  });

};

/* EXPORT */

export default unpack;
