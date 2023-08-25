
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import make from './make';
import readdir from './readdir';
import type {FileDescriptor} from './types';

/* MAIN */

const pack = ( folderPath: string, archivePath: string ): void => {

  folderPath = path.normalize ( folderPath );

  const filePaths = readdir ( folderPath );
  const files: Record<string, FileDescriptor> = {};

  for ( const filePath of filePaths ) {

    const normPath = path.relative ( folderPath, filePath ).replaceAll ( '\\', '/' );
    const content = fs.readFileSync ( filePath );
    const stat = fs.statSync ( filePath );
    const mode = stat.mode;
    const ctime = Math.round ( stat.ctimeMs );
    const mtime = Math.round ( stat.mtimeMs );
    const file: FileDescriptor = { content, mode, ctime, mtime };

    files[normPath] = file;

  }

  const archive = make ( files );

  fs.writeFileSync ( archivePath, archive );

};

/* EXPORT */

export default pack;
