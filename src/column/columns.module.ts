import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';

import { AuthModule } from '../auth/auth.module';
import { ColumnEntity } from './column.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
    AuthModule],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {
}
