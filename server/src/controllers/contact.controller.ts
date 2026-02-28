import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http.exception';
import { validationResult } from 'express-validator';

const store = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, text } = req.body;

  const message = encodeURI(
    `Name: *${name}*\nEmail: *${email}*\nText: ${text}`
  );

  void fetch(
    `${process.env.TELEGRAM_HOST}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${message}&parse_mode=${process.env.TELEGRAM_PARSE_MODE}`
  );

  try {
    return res.status(200).json({
      status: 'success'
    });
  } catch (e) {
    return next(new HttpException(404, 'Not found'));
  }
};

export default {
  store
};
