import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const UPLOAD_FOLDER =
  process.env.UPLOAD_FOLDER || path.join(__dirname, './../../upload');

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const CLIENT_FOLDER =
  process.env.CLIENT_FOLDER || path.join(__dirname, './../../public');

if (!fs.existsSync(CLIENT_FOLDER)) {
  fs.mkdirSync(CLIENT_FOLDER, { recursive: true });
}

const SERVER_HOST = process.env.SERVER_HOST || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

const UPLOAD_LIMIT = Number(process.env.UPLOAD_LIMIT) || 20 * 1024 * 1024;
const MAX_TEXT_LENGTH = Number(process.env.MAX_TEXT_LENGTH) || 20480;

export const config = {
  server: {
    host: SERVER_HOST,
    port: SERVER_PORT
  },
  folders: {
    upload: UPLOAD_FOLDER,
    client: CLIENT_FOLDER
  },
  uploadFileSizeLimit: UPLOAD_LIMIT,
  maxTextLength: MAX_TEXT_LENGTH,
  sentry: {
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE,
    profilesSampleRate: process.env.SENTRY_PROFILES_SAMPLE_RATE
  }
};
