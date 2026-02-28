import express from 'express';
import ContactController from '../controllers/contact.controller';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 64 })
      .withMessage('Invalid name'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Not a valid email address')
      .isLength({ max: 64 })
      .withMessage('Invalid email'),
    body('text')
      .trim()
      .notEmpty()
      .withMessage('Text is required')
      .isLength({ max: 4096 })
      .withMessage('Invalid text')
  ],
  ContactController.store
);

export default router;
