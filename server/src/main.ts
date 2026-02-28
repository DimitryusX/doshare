import http from 'http';
import { config } from './config/config';
import App from './app'

const app = new App();

http
  .createServer(app.express)
  .listen(config.server.port, () =>
    console.log(
      `⚡️[server]: Server is running at ${config.server.host}:${config.server.port}`
    )
  );
