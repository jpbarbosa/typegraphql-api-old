import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

useContainer(Container);

export const testConn = () => {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities: ['./src/entities/*.ts'],
    subscribers: ['./src/subscribers/*.ts'],
    synchronize: true,
    dropSchema: true,
  });
};
