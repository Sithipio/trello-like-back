import { DataSource, ObjectType, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv';

const rootDir = path.resolve();
dotenv.config({
  path: path.join(rootDir, '.env.stage.dev'),
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [process.env.DB_ENTITIES],
});

AppDataSource.initialize()
  .then(() => {
    Logger.log('Data Source has been initialized!');
  })
  .catch((err) => {
    Logger.log('Error during Data Source initialization');
    Logger.error(err);
  });

@Injectable()
export abstract class RepositoryDAO<T> {
  protected async _getRepository(entity: ObjectType<T>): Promise<Repository<T>> {
    return AppDataSource.getRepository(entity);
  }

}
