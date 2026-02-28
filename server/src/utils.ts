import archiver from 'archiver';
import fs from 'fs';
import { IStoreFile } from './models/store.model';

/**
 * @param {Number} limit
 * @returns {String}
 */
export const random = (limit: number = 7): string => {
  let value = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < limit) {
    value += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return value;
};

export function zipDirectory(storageFiles: IStoreFile[], outPath: string) {
  const archive = archiver('zip', { zlib: { level: 5 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise<void>((resolve, reject) => {
    archive.on('error', (err) => reject(err)).pipe(stream);

    for (let file of storageFiles) {
      archive.file(file.location, { name: file.title });
    }

    stream.on('close', () => resolve());
    archive.finalize();
  });
}
