import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsModule } from "./boards/boards.module";
import { TasksModule } from "./tasks/tasks.module";

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
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
