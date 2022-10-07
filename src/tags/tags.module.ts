import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { TagEntity } from './tag.entity';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([TagEntity]),
    AuthModule,
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagModule {
}
