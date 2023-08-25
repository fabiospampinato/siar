
/* IMPORT */

import fs from 'node:fs';
import color from 'tiny-colors';
import visit from './visit';

/* MAIN */

const ls = ( archivePath: string ): void => {

  const archive = fs.readFileSync ( archivePath );

  visit ( archive, ( file, {isLast, level} ) => {

    if ( 'content' in file ) { // File

      const indentation = color.dim ( '│  '.repeat ( level ) );
      const prefix = color.dim ( `${isLast ? '└' : '├'}── ` );
      const name = file.name;
      const line = `${indentation}${prefix}${name}`;

      console.log ( line );

    } else { // Folder

      const indentation = color.dim ( '│  '.repeat ( level ) );
      const prefix = color.dim ( `${isLast ? '└' : '├'}── ` );
      const name = color.bold ( color.cyan ( file.name ) );
      const line = `${indentation}${prefix}${name}`;

      console.log ( line );

    }

  }, '*' );

};

/* EXPORT */

export default ls;
