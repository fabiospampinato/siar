
/* IMPORT */

import fs from 'node:fs';
import color from 'tiny-colors';
import visit from './visit';

/* MAIN */

const ls = ( archivePath: string, pretty: boolean = false ): void => {

  const archive = fs.readFileSync ( archivePath );

  if ( pretty ) {

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
        const name = color.bold.cyan ( file.name );
        const line = `${indentation}${prefix}${name}`;

        console.log ( line );

      }

    }, '*' );

  } else {

    visit ( archive, file => {

      console.log ( file.path );

    });

  }

};

/* EXPORT */

export default ls;
