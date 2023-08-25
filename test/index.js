
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import U8 from 'uint8-encoding';
import {get, pack, read, unpack} from '../dist/index.js';

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

  it ( 'can read a file from an archive', t => {

    pack ( 'node_modules', 'node_modules.siar' );

    const file = read ( 'node_modules.siar', 'fava/package.json' );
    const content = fs.readFileSync ( 'node_modules/fava/package.json', 'utf8' );

    fs.unlinkSync ( 'node_modules.siar' );

    t.deepEqual ( U8.decode ( file.content ), content );

  });

  it ( 'can get a file from an archive', t => {

    pack ( 'node_modules', 'node_modules.siar' );

    const archive = fs.readFileSync ( 'node_modules.siar' );
    const file = get ( archive, 'fava/package.json' );
    const content = fs.readFileSync ( 'node_modules/fava/package.json', 'utf8' );

    fs.unlinkSync ( 'node_modules.siar' );

    t.deepEqual ( U8.decode ( file.content ), content );

  });

});
