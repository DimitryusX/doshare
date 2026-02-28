import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  store: {
    // create: Joi.object<IStoreModel>({
    //   title: Joi.string().required(),
    //   alias: Joi.string().required(),
    //   content: Joi.string(),
    // }),
  }
};
