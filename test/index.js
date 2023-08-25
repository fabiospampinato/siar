
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import {pack, unpack} from '../dist/index.js';

/* MAIN */

describe ( 'Siar', it => {

  it ( 'can pack and unpack a folder', t => {

    pack ( 'node_modules', 'node_modules.siar' );
    unpack ( 'node_modules.siar', 'node_modules_2' );
    pack ( 'node_modules_2', 'node_modules_2.siar' );

    const archive1 = fs.readFileSync ( 'node_modules.siar' );
    const archive2 = fs.readFileSync ( 'node_modules_2.siar' );

    fs.rmdirSync ( 'node_modules_2', { recursive: true } );
    fs.unlinkSync ( 'node_modules.siar' );
    fs.unlinkSync ( 'node_modules_2.siar' );

    t.deepEqual ( archive1, archive2 );

  });

});
