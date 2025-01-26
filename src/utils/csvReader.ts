// src/utils/csvReader.ts

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface CsvReaderOptions {
  /** If `true`, treat the first row as headers and return each row as an object. */
  columns?: boolean | string[];
  /** Encoding for reading the CSV file (default: "utf-8"). */
  encoding?: BufferEncoding;
}

/**
 * Reads a CSV file from the given path and returns an array of objects (one per row).
 * @param relativeFilePath - Path to the CSV file, relative to project or `__dirname`.
 * @param options - Options for CSV parsing and file encoding.
 * @returns An array of objects if `columns=true`, otherwise an array of arrays.
 */
export function readCsv<T = Record<string, unknown>>(
  relativeFilePath: string,
  options: CsvReaderOptions = { columns: true, encoding: 'utf-8' }
): T[] {
  const absolutePath = path.isAbsolute(relativeFilePath)
    ? relativeFilePath
    : path.join(__dirname, relativeFilePath);

  // Read the CSV file content
  const fileContent = fs.readFileSync(absolutePath, options.encoding);

  // Parse the CSV data into an array of rows
  const records = parse(fileContent, {
    columns: options.columns,
    skip_empty_lines: true,
  });

  return records as T[];
}
