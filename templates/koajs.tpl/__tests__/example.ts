import 'jest';
import request from 'supertest';
import {createHttpTerminator} from 'http-terminator';
import {server, app} from '../src';

describe('Health endpoint test', () => {
  const terminator = createHttpTerminator({
    server,
  });
  afterAll(() => {
    terminator.terminate();
  });
  it('should always return 200', async () => {
    const response = await request(app.callback()).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('UP');
  });
});
