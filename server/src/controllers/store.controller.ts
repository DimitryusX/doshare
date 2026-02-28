import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import {
  IStoreFile,
  getStore,
  setStore,
  getFile,
  getArchive
} from '../models/store.model';
import fs from 'fs';
import path from 'path';
import { random, zipDirectory } from '../utils';
import { config } from '../config/config';
import HttpException from '../exceptions/http.exception';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

const single = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;
  const password = req.query.password as string | undefined;
  const cookiePasswordValue = req.cookies[`store_${slug}`] || undefined;

  try {
    const store = await getStore(
      slug,
      password || cookiePasswordValue,
      !!password
    );

    if (!!password) {
      res.cookie(`store_${slug}`, password, {
        maxAge: 1000 * 60 * 60 * 1,
        httpOnly: true
      });
    }

    res.status(200);

    res.json(store);
    return;
  } catch (e) {
    next(new HttpException(404, 'Not found'));
    return;
  }
};

const store = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: 'path' in error ? error.path : 'unknown',
      message: error.msg
    }));

    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    });
  }

  const { password, content, time, isCode } = req.body;

  // Additional text size check
  if (content && content.length > config.maxTextLength) {
    const textLimitKB = Math.round(config.maxTextLength / 1024);
    return res.status(422).json({
      success: false,
      message: 'Text content is too long',
      errors: [{
        field: 'content',
        message: `Text exceeds the ${textLimitKB}KB limit. Current length: ${Math.round(content.length / 1024)}KB. Please shorten your text.`
      }]
    });
  }

  const storageFiles: IStoreFile[] = [];
  const files = (req.files as Express.Multer.File[]) || [];

  let folder = null;
  let archivePathFile = null;

  if (files.length > 0) {
    folder = random(10);
    const folderForUpload = path.join(config.folders.upload, folder);

    // TODO: Don't need create folder if don't have files
    if (!fs.existsSync(folderForUpload)) {
      fs.mkdirSync(folderForUpload, { recursive: true });
    }

    for (const index in files) {
      const file = files[index];
      const ext = path.extname(file.originalname);
      const filename = [random(10), ext].join('');
      const folderForUploadFile = path.join(folderForUpload, filename);

      fs.writeFileSync(folderForUploadFile, file.buffer);

      storageFiles.push({
        _id: new mongoose.Types.ObjectId(), // TODO Refactor to UUID
        title: Buffer.from(file.originalname, 'latin1').toString('utf8'),
        location: [config.folders.upload, folder, filename].join('/'),
        size: file.size
      });
    }

    if (storageFiles.length > 1) {
      archivePathFile = path.join(config.folders.upload, `${folder}.zip`);
      await zipDirectory(storageFiles, archivePathFile);
    }
  }

  const timeShouldBeRequired = Number(time) || 30;

  try {
    const { alias } = await setStore(
      {
        title: 'Guest',
        password: !!password ? bcrypt.hashSync(password, 10) : null,
        content: content,
        files: storageFiles,
        archive: archivePathFile,
        folder: folder,
        isCode: isCode === '1',
        time: timeShouldBeRequired
      },
      timeShouldBeRequired
    );

    return res.status(200).json({
      alias,
      time: timeShouldBeRequired,
      hasArchive: !!archivePathFile
    });
  } catch (e) {
    return next(new HttpException(404, 'Not found'));
  }
};

const downloadSingleFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slug = req.params.slug as string;
  const fileId = req.params.fileId as string;

  try {
    const { title, location } = await getFile(slug, fileId);
    res.download(location, title);
    return;
  } catch (e) {
    next(new HttpException(404, 'Not found'));
    return;
  }
};

const download = async (req: Request, res: Response, next: NextFunction) => {
  const slug = req.params.slug as string;

  const password =
    (req.query.password as string | undefined) ||
    req.cookies[`store_${slug}`] ||
    undefined;

  try {
    const { title, location } = await getArchive(slug, password);
    res.download(location, title);
    return;
  } catch (e) {
    next(new HttpException(404, 'Not found'));
    return;
  }
};

export default {
  single,
  store,
  download,
  downloadSingleFile
};
