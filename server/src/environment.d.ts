declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECT: string;
      SERVER_HOST?: string;
      SERVER_PORT?: string;
      UPLOAD_LIMIT: number;
      UPLOAD_FOLDER: string;
      CLIENT_FOLDER: string;
      SENTRY_DSN?: string;
      SENTRY_TRACES_SAMPLE_RATE?: number;
      SENTRY_PROFILES_SAMPLE_RATE?: number;
      REDIS_HOST: string;
      REDIS_PASSWORD?: string;
      REDIS_PORT: number;
      REDIS_DATABASE: number;
    }
  }
}

export {};
