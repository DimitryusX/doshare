import mongoose, { Document, Schema, Types } from 'mongoose';
import getRedisInstance from '../redis';
import { random } from '../utils';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface IStoreFile {
  _id: mongoose.Types.ObjectId;
  title: string;
  location: string;
  size: number;
}

export interface IStore {
  title: string;
  alias: string;
  password: string | null;
  time: number;
  start: number;
  content: string | null;
  archive: string | null;
  folder: string | null;
  isCode?: boolean;
  files: IStoreFile[];
}

export const exist = async (slug: string): Promise<boolean> => {
  const { getRedisValue, connection } = await getRedisInstance();
  const redisRawString = await getRedisValue(slug);
  connection.disconnect();
  return !!redisRawString;
};

export const getStore = async (
  slug: string,
  password?: string,
  isErrorTextReturn?: boolean
) => {
  const { getRedisValue, connection } = await getRedisInstance();
  const redisRawString = await getRedisValue(slug);
  connection.disconnect();

  if (!redisRawString) {
    throw new Error('Not found');
  }

  const {
    title,
    alias,
    content,
    time,
    files,
    archive,
    start,
    isCode,
    password: hashPasswordString
  }: IStore = JSON.parse(redisRawString);

  const filesAfterFilter = files.map((x) => {
    return {
      _id: x._id,
      title: x.title,
      size: x.size
    };
  });

  if (!hashPasswordString) {
    return {
      title,
      alias,
      content,
      time,
      files: filesAfterFilter,
      start,
      isCode,
      hasArchive: !!archive,
      hasPassword: false
    };
  }

  let error = undefined;

  if (password) {
    if (bcrypt.compareSync(password, hashPasswordString)) {
      return {
        title,
        alias,
        content,
        time,
        files: filesAfterFilter,
        start,
        isCode,
        hasArchive: !!archive,
        hasPassword: false
      };
    } else {
      error = !!isErrorTextReturn ? 'Wrong password !' : undefined;
    }
  }

  return {
    title,
    time,
    start,
    hasPassword: true,
    error
  };
};

export const setStore = async <T>(data: T, time: number) => {
  const { getRedisValue, setRedisValue, connection } = await getRedisInstance();

  let aliasLength = 3;
  let alias = random(aliasLength);

  do {
    aliasLength++;
    alias = random(aliasLength);
  } while (await getRedisValue(alias));

  const contentObject = {
    ...data,
    alias,
    time,
    start: Date.now()
  };

  await setRedisValue(alias, JSON.stringify(contentObject), time);
  connection.disconnect();

  return contentObject;
};

export const getFile = async (
  slug: string,
  fileId: string
): Promise<{ title: string; location: string }> => {
  const { getRedisValue, connection } = await getRedisInstance();
  const redisRawString = await getRedisValue(slug);

  connection.disconnect();

  if (!redisRawString) {
    throw new Error('Not found');
  }

  const { files }: IStore = JSON.parse(redisRawString);
  const file = files.find((x) => x._id.toString() === fileId);

  if (!file) {
    throw new Error('Not found');
  }

  return {
    title: file.title,
    location: file.location
  };
};

export const getArchive = async (slug: string, password?: string) => {
  const { getRedisValue, connection } = await getRedisInstance();
  const redisRawString = await getRedisValue(slug);

  connection.disconnect();

  if (!redisRawString) {
    throw new Error('Not found');
  }

  const { archive, password: hashPasswordString }: IStore =
    JSON.parse(redisRawString);

  if (!!hashPasswordString) {
    if (!password) {
      throw new Error('Not found');
    }

    if (!bcrypt.compareSync(password, hashPasswordString)) {
      throw new Error('Not found');
    }
  }

  if (!archive) {
    throw new Error('Not found');
  }

  return {
    title: path.basename(archive),
    location: archive
  };
};
