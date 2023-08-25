
/* IMPORT */

import benchmark from 'benchloop';
import picolate from '../dist/index.js';

/* MAIN */

benchmark.config ({
  iterations: 10_000
});

// benchmark ({
//   name: 'picolate.compile',
//   fn: () => {
//     picolate.compile ( TEMPLATE );
//   }
// });

// benchmark ({
//   name: 'picolate.parse',
//   fn: () => {
//     picolate.parse ( TEMPLATE );
//   }
// });

// benchmark ({
//   name: 'picolate.render',
//   fn: () => {
//     picolate.render ( TEMPLATE, CONTEXT );
//   }
// });

// benchmark ({
//   name: 'picolate.validate',
//   fn: () => {
//     picolate.validate ( TEMPLATE );
//   }
// });

benchmark.summary ();
