
/* IMPORT */

import decode from './decode';
import type {FileDecoded, FolderEncoded, FolderDecoded, VisitorAll, VisitorFile, VisitorFolder, VisitorMetadata, VisitorType} from './types';

/* MAIN */

function visit ( archive: Uint8Array, visitor: VisitorFile, type?: 'file' ): void;
function visit ( archive: Uint8Array, visitor: VisitorFolder, type: 'folder' ): void;
function visit ( archive: Uint8Array, visitor: VisitorAll, type: '*' ): void;
function visit ( archive: Uint8Array, visitor: any, type: VisitorType = 'file' ): void { //TSC

  const [folder, contents] = decode ( archive );

  const canVisitFiles = type === 'file' || type === '*';
  const canVisitFolders = type === 'folder' || type === '*';

  const traverse = ( folder: FolderEncoded, parents: string[] ): void => {

    const lastDir = Object.keys ( folder.dirs || {} ).pop ();
    const lastFile = Object.keys ( folder.files || {} ).pop ();

    for ( const name in folder.dirs ) {
      const encoded = folder.dirs[name];
      const parentsNext = [...parents, name];
      if ( canVisitFolders ) {
        const path = parentsNext.join ( '/' );
        const decoded: FolderDecoded = { name, path };
        const level = parents.length;
        const isEmpty = !encoded.dirs && !encoded.files;
        const isLast = name === lastDir && !folder.files;
        const meta: VisitorMetadata = { isEmpty, isLast, level };
        visitor ( decoded, meta );
      }
      traverse ( encoded, parentsNext );
    }

    if ( canVisitFiles ) {
      for ( const name in folder.files ) {
        const encoded = folder.files[name];
        const {offset, size, ...base} = encoded;
        const content = contents.subarray ( offset, offset + size );
        const path = [...parents, name].join ( '/' );
        const decoded: FileDecoded = { ...base, name, path, content };
        const level = parents.length;
        const isEmpty = true;
        const isLast = ( name === lastFile );
        const meta: VisitorMetadata = { isEmpty, isLast, level };
        visitor ( decoded, meta );
      }
    }

  };

  traverse ( folder, [] );

};

/* EXPORT */

export default visit;
