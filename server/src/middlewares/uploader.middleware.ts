import multer from 'multer';
import { config } from '../config/config';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: config.uploadFileSizeLimit }
});

const storeFilesUpload = upload.array('files', 100);

export { storeFilesUpload };
