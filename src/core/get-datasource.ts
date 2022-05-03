import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const getDataSource = new DataSource({
  "type": "mongodb",
  "host": "localhost",
  "port": 27017,
  "database": "foreduc",
  "synchronize": true,
  "logging": true,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  useUnifiedTopology: true,
});