# Siar

A simple random-access archive format.

A `siar` archive is a single binary file, containing a UTF8-encoded JSON header followed by the concatenated content of the files.

## Features

- The `siar` archive format is super simple.
- A file can be extracted from a `siar` archive efficiently, with random access.
- A `siar` archive can be pretty compact, for lots of small files it's significantly smaller than a tarball.
- A `siar` archive can be created and read in the browser too.

## Install

```sh
npm install --save siar
```

## Usage

You would use the CLI commands like this:

```sh
# Pack a folder into an archive
siar pack my-folder my-archive.siar

# Unpack an archive into a folder
siar unpack my-archive.siar my-folder

# List the content of an archive
siar ls my-archive.siar

# Extract a single file from an archive
siar extract my-archive.siar path/to/file.txt path/to/output_file.txt
```

You would use the programmatic API like this:

```ts
import {extract, get, ls, make, pack, unpack, visit} from 'siar';

// Pack a folder into an archive -- just like with the "pack" command

pack ( 'my-folder', 'my-archive.siar' );

// Unpack an archive into a folder -- just like with the "unpack" command

unpack ( 'my-archive.siar', 'my-folder' );

// List the content of an archive -- just like with the "ls" command

ls ( 'my-archive.siar' );

// Extract a single file from an archive -- just like with the "extract" command

extract ( 'my-archive.siar', 'path/to/file.txt', 'path/to/output_file.txt' );

// Make an archive from a map of files -- this function works in the browser too

const archive = make ({
  'path/to/file.txt': {
    content: new Uint8Array (),
    mode: 0o644, // Optional
    ctime: 123456789, // Optional
    mtime: 123456789 // Optional
  },
  'path/to/another-file.txt': {
    content: new Uint8Array ()
  }
});

// Get a single file from an archive -- this function works in the browser too

const file = get ( archive, 'path/to/file.txt' );

// Visit files or folders in an archive -- this function works in the browser too

visit ( archive, file => { // Files only
  file.name; // => 'file.txt'
  file.path; // => 'path/to/file.txt'
  file.content; // => Uint8Array ()
  file.mode; // => 0o644
  file.ctime; // => 123456789
  file.mtime; // => 123456789
});

visit ( archive, folder => { // Folders only
  folder.name; // => 'folder'
  folder.path; // => 'path/to/folder'
});

visit ( archive, entry => { // Files and folders
  if ( 'content' in entry ) {
    console.log ( 'It is a file', entry );
  } else {
    console.log ( 'It is a folder', entry );
  }
});
```

## License

MIT © Fabio Spampinato
