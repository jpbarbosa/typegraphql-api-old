import { seed } from '../utils/seed';
import { Connection, createConnection, useContainer } from 'typeorm';
import Container from 'typedi';

let conn: Connection;

beforeAll(async () => {
  useContainer(Container);
  conn = await createConnection();
  await seed();
});

afterAll(async () => {
  await conn.close();
});
