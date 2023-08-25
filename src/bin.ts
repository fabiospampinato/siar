#!/usr/bin/env node

/* IMPORT */

import {bin} from 'specialist';
import {extract, ls, pack, unpack} from '.';

/* MAIN */

bin ( 'siar', 'A simple random-access archive format' )
  /* EXTRACT */
  .command ( 'extract', 'Extract a single file from an archive' )
  .argument ( '<archive>', 'The archive to extract the file from' )
  .argument ( '<archiveFile>', 'The file path to extract' )
  .argument ( '<outputFile>', 'The file path to write to' )
  .action ( ( options, [archive, archiveFile, outputFile] ) => {
    return extract ( archive, archiveFile, outputFile );
  })
  /* LS */
  .command ( 'ls', 'List the content of an archive' )
  .argument ( '<archive>', 'The archive to list' )
  .action ( ( options, [archive] ) => {
    return ls ( archive );
  })
  /* PACK */
  .command ( 'pack', 'Pack a folder into an archive' )
  .argument ( '<folder>', 'The folder to pack' )
  .argument ( '<archive>', 'The archive to output' )
  .action ( ( options, [folder, archive] ) => {
    return pack ( folder, archive );
  })
  /* UNPACK */
  .command ( 'unpack', 'Unpack an archive into a folder' )
  .argument ( '<archive>', 'The archive to unpack' )
  .argument ( '<folder>', 'The folder to output' )
  .action ( ( options, [archive, folder] ) => {
    return unpack ( archive, folder );
  })
  /* RUN */
  .run ();
