import { http, HttpResponse } from 'msw';
import { server } from '../test/mocks/server';
import { BASE_URL, fetchFn } from './fetch';

describe('Fetch util', () => {
  const setup = (success = true) => {
    const response = success
      ? HttpResponse.json({ data: 'response' })
      : HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    const handlers = [
      http.get(`${BASE_URL}/path`, () => {
        return response;
      }),
    ];

    server.use(...handlers);
  };

  it('should make a request to the correct URL', async () => {
    setup();
    const response = await fetchFn('path');
    const data = await response.json();

    expect(data).toEqual({ data: 'response' });
  });

  it('should throw an error if the response is not ok', async () => {
    setup(false);

    await expect(fetchFn('path')).rejects.toThrow('Network response was NOT ok');
  });
});
