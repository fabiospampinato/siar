
/* MAIN */

type FileBase = {
  mode?: number,
  ctime?: number,
  mtime?: number
};

type FileEncoded = FileBase & {
  offset: number,
  size: number
};

type FileDecoded = FileBase & {
  name: string,
  path: string,
  content: Uint8Array
};

type FileDescriptor = FileBase & {
  content: Uint8Array
};

type FolderEncoded = {
  dirs?: Record<string, FolderEncoded>,
  files?: Record<string, FileEncoded>
};

type FolderDecoded = {
  name: string,
  path: string
};

type VisitorAll = {
  ( target: FileDecoded | FolderDecoded, meta: VisitorMetadata ): void
};

type VisitorFile = {
  ( file: FileDecoded, meta: VisitorMetadata ): void
};

type VisitorFolder = {
  ( folder: FolderDecoded, meta: VisitorMetadata ): void
};

type VisitorMetadata = {
  isEmpty: boolean,
  isLast: boolean,
  level: number
};

type VisitorType = 'file' | 'folder' | '*';

/* EXPORT */

export type {FileBase, FileEncoded, FileDecoded, FileDescriptor, FolderEncoded, FolderDecoded, VisitorAll, VisitorFile, VisitorFolder, VisitorMetadata, VisitorType};
