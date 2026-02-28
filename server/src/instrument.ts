import * as Sentry from '@sentry/node';
// import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { config } from './config/config';

Sentry.init({
  dsn: config.sentry.dsn,
  // integrations: [nodeProfilingIntegration()],
  tracesSampleRate: config.sentry.tracesSampleRate
  // profilesSampleRate: config.sentry.profilesSampleRate
});
