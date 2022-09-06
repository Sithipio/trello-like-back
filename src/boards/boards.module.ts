import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardEntity } from './board.entity';
import { AuthModule } from '../auth/auth.module';
import { BoardRepository } from './board.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
    AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {
}
