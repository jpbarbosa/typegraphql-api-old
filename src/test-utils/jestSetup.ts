import { seed } from '../utils/seed';
import { testConn } from './testConn';
import { Connection } from 'typeorm';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();

  await seed();
});

afterAll(async () => {
  await conn.close();
});
