import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';


@Module({
  imports: [],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {
}
