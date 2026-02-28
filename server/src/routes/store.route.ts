import express from 'express';
import StoreController from '../controllers/store.controller';
import { storeFilesUpload } from '../middlewares/uploader.middleware';
import multerErrorHandler from '../middlewares/multer-error.middleware';
import { body, param, oneOf } from 'express-validator';
import { config } from '../config/config';

const router = express.Router();

router.post(
  '/',
  storeFilesUpload,
  multerErrorHandler,
  [
    body('title')
      // .escape()
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage('Invalid title'),
    body('content')
      // .escape()
      .optional()
      .trim()
      .isLength({ max: config.maxTextLength })
      .withMessage(
        `Text content is too long. Maximum allowed: ${Math.round(config.maxTextLength / 1024)}KB (${config.maxTextLength.toLocaleString()} characters)`
      ),
    body('time')
      .notEmpty()
      .isNumeric()
      .isInt({ min: 1, max: 480 })
      .withMessage('Invalid time. Please select a value between 1 and 480 minutes'),
    oneOf(
      [
        body('content').notEmpty(),
        body('files').custom((value, { req }) => {
          if (req.files.length === 0) {
            throw new Error('Files should be uploaded');
          }

          return true;
        })
      ],
      {
        message: 'Please provide either text content or upload files. Both cannot be empty.'
      }
    )
  ],
  StoreController.store
);

router.get(
  '/:slug/file/:fileId',
  [param('slug').isSlug(), param(':fileId').isMongoId()],
  StoreController.downloadSingleFile
);

router.get(
  '/:slug/download',
  [param('slug').isSlug()],
  StoreController.download
);

router.get('/:slug', [param('slug').isSlug()], StoreController.single);

export default router;
