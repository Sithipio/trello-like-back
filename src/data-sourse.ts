import { DataSource, ObjectType, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BoardEntity } from './boards/board.entity';
import * as dotenv from 'dotenv'
import * as path from 'node:path';

const rootDir = path.resolve();
dotenv.config({
  path: path.join(rootDir, '.env.stage.dev'),
});

console.log(1, process.env.DB_ENTITIES);
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12301',
  database: 'trello-like-back',
  entities: [process.env.DB_ENTITIES],
});

AppDataSource.initialize()
  .then(() => {

    console.log(AppDataSource.options.entities);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

@Injectable()
export abstract class RepositoryDAO<T> {
  protected async _getRepository(entity: ObjectType<T>) : Promise<Repository<T>> {
    return AppDataSource.getRepository(entity);
  }

}

