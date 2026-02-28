import './instrument';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { config } from './config/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import StoreRoutes from './routes/store.route';
import ContactRoutes from './routes/contact.route';
import HttpException from './exceptions/http.exception';
import errorMiddleware from './middlewares/error.middleware';
import path from 'path';
import { exist } from './models/store.model';
import * as Sentry from '@sentry/node';

class App {
  public express: Application;

  private debug = false;

  constructor(debug = false) {
    this.debug = debug;

    this.express = express();

    this.initializationMiddelwares();
    this.initializationRoutes();

    if (!this.debug) Sentry.setupExpressErrorHandler(this.express);

    /** Error handler */
    this.initializationErrorHandler();
  }

  private initializationRoutes(): void {
    // Static files
    this.express.use(express.static(config.folders.client));

    this.express.get('/health', (req: Request, res: Response) => {
      res.json({ message: 'Service is running ...' });
    });

    this.express.use('/api/v1/contact', ContactRoutes);
    this.express.use('/api/v1/store', StoreRoutes);

    const listOfUrls = [
      '/create',
      '/contact',
      '/404',
      '/terms-and-conditions',
      '/donate'
    ];

    for (let url of listOfUrls) {
      this.express.get(url, (req: Request, res: Response) => {
        res.sendFile(path.resolve(config.folders.client, 'index.html'));
      });
    }

    this.express.get('/:slug', async (req: Request, res: Response) => {
      const slug = req.params.slug as string;

      const isStoreExist = await exist(slug);

      if (!isStoreExist) {
        res.redirect('/404');
        return;
      }

      res.sendFile(path.resolve(config.folders.client, 'index.html'));
    });

    this.express.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(config.folders.client, 'index.html'));
    });
  }

  private initializationMiddelwares(): void {
    this.express.use(morgan('combined'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());

    this.express.use(
      cors({
        origin: true,
        credentials: true,
        exposedHeaders: ['Content-Disposition']
      })
    );
  }

  private initializationErrorHandler(): void {
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      // const error = new Error('Not found');
      next(new HttpException(404, 'Not found'));
    });

    this.express.use(errorMiddleware);
  }
}

export default App;
