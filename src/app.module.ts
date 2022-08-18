import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12301',
      database: 'trello-like-back',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BoardsModule,
    TasksModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {
}
