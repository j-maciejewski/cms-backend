import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

export const generateFilename = (extension: string, length = 16) => {
  return (
    Array(length)
      .fill(null)
      .map(() => ((Math.random() * 36) | 0).toString(36))
      .join('') +
    '.' +
    extension
  );
};

export const saveImage = (base64: string, fileName: string) => {
  return writeFile(
    join(__dirname, '..', '..', 'assets', 'images', fileName),
    base64,
    'base64',
  );
};
