
/* IMPORT */

import benchmark from 'benchloop';
import fs from 'node:fs';
import {pack, unpack, visit, read, get} from '../dist/index.js';

/* MAIN */

benchmark.config ({
  iterations: 1
});

benchmark ({
  name: 'pack',
  fn: () => {
    return pack ( 'node_modules', 'node_modules.asir' );
  }
});

benchmark ({
  name: 'unpack',
  afterEach: () => {
    fs.rmdirSync ( 'node_modules_2', { recursive: true } );
  },
  fn: () => {
    return unpack ( 'node_modules.asir', 'node_modules_2' );
  }
});

benchmark ({
  name: 'visit',
  fn: () => {
    const archive = fs.readFileSync ( 'node_modules.asir' );
    return visit ( archive, () => {}, '*' );
  }
});

benchmark ({
  name: 'read',
  fn: () => {
    const archive = fs.readFileSync ( 'node_modules.asir' );
    return visit ( archive, file => {
      read ( 'node_modules.asir', file.path, 'temp.txt' );
    }, 'file' );
  }
});

benchmark ({
  name: 'get',
  afterEach: () => {
    fs.unlinkSync ( 'node_modules.asir' );
  },
  fn: () => {
    const archive = fs.readFileSync ( 'node_modules.asir' );
    return visit ( archive, file => {
      get ( archive, file.path );
    }, 'file' );
  }
});

benchmark.summary ();
