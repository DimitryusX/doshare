# DoShare project

### Redis connection for local testing

```
docker run --rm --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

### Sentry

Upload your source maps using tsc and Sentry CLI:

```
pnpm run sentry:sourcemaps
```

Documentation:
[read docs](https://docs.sentry.io/platforms/javascript/guides/express/sourcemaps/uploading/typescript/)
