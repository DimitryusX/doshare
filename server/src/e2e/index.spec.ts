import request from 'supertest';
import App from './../app';

const app = new App(true);

function getRandomElement(
  arrayOfNumbers: (number | string)[]
): number | string {
  const randomIndex = Math.floor(Math.random() * arrayOfNumbers.length);
  return arrayOfNumbers[randomIndex];
}

describe('health endpoint', () => {
  it('Get /health and expect 200', async () => {
    const response = await request(app.express).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ message: 'Service is running ...' });
  });
});

describe('store endpoint', () => {
  it('Should create new store in 5 mins', async () => {
    const response = await request(app.express)
      .post('/api/v1/store')
      .field('content', 'Example test 1')
      .field('time', 5);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty(
      'alias',
      expect.stringMatching(/[a-zA-Z0-9]{4}/i)
    );
    expect(response.body).toHaveProperty('time', 5);
    expect(response.body).toHaveProperty('hasArchive', false);
  });

  it('Should create new store in 15 mins', async () => {
    const response = await request(app.express)
      .post('/api/v1/store')
      .field('content', 'Example test 2')
      .field('time', 15);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty(
      'alias',
      expect.stringMatching(/[a-zA-Z0-9]{4}/i)
    );
    expect(response.body).toHaveProperty('time', 15);
    expect(response.body).toHaveProperty('hasArchive', false);
  });

  it('Should create new store in 30 mins', async () => {
    const response = await request(app.express)
      .post('/api/v1/store')
      .field('content', 'Example test 3')
      .field('time', 30);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty(
      'alias',
      expect.stringMatching(/[a-zA-Z0-9]{4}/i)
    );

    expect(response.body).toHaveProperty('time', 30);
    expect(response.body).toHaveProperty('hasArchive', false);

    const alias = response.body.alias as string;

    const response2 = await request(app.express).get(`/api/v1/store/${alias}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.body).toHaveProperty('time', expect.any(Number));
    expect(response2.body).toHaveProperty('content', 'Example test 3');
    expect(response2.body).toHaveProperty('alias', alias);
    expect(response2.body).toHaveProperty('hasPassword', false);
  });
});

describe('Parallel connections test', () => {
  it('should handle 100 parallel connections', async () => {
    const arrayOfText = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

    const parallelRequests = Array.from({ length: 200 }, (_, i) =>
      request(app.express)
        .post('/api/v1/store')
        .field('content', getRandomElement(arrayOfText))
        .field('time', getRandomElement([5, 15, 30, 60]).toString())
    );

    const responses = await Promise.all(parallelRequests);

    responses.forEach((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('time', expect.any(Number));
      expect(response.body).toHaveProperty(
        'alias',
        expect.stringMatching(/[a-zA-Z0-9]{4,6}/i)
      );

      expect(response.body).toHaveProperty('hasArchive', false);
    });
  });
});
