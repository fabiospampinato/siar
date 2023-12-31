
/* MAIN */

const basename = (() => {

  const dirnameRe = /^.*(\\|\/)/;

  return ( path: string ): string => {

    return path.replace ( dirnameRe, '' );

  };

})();

const weakMemoize = <T extends object, U> ( fn: ( arg: T ) => U ): (( arg: T ) => U) => {

  const cache = new WeakMap<T, U>();

  return ( arg: T ): U => {

    const cached = cache.get ( arg );

    if ( cached ) return cached;

    const result = fn ( arg );

    cache.set ( arg, result );

    return result;

  };

};

/* EXPORT */

export {basename, weakMemoize};
