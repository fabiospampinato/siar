
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';

/* MAIN */

const readdir = ( rootPath: string ): string[] => {

  const traverse = ( rootPath: string, filePaths: string[] ): string[] => {

    const dirents = fs.readdirSync ( rootPath, { withFileTypes: true } );

    for ( const dirent of dirents ) {

      const direntPath = path.join ( rootPath, dirent.name );

      if ( dirent.isFile () ) {

        filePaths.push ( direntPath );

      } else if ( dirent.isDirectory () ) {

        traverse ( direntPath, filePaths );

      }

    }

    return filePaths;

  };

  return traverse ( rootPath, [] );

};

/* EXPORT */

export default readdir;
