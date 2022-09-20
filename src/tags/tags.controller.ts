import { Body, Controller, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { URL_TAG } from '../routes.constant';
import { TagsService } from './tags.service';
import { TagEntity } from './tag.entity';
import { PostPatchTagDto } from './dto';


@Controller('/:boardId' + URL_TAG)
@UseGuards(AuthGuard())
export class TagsController {
  private logger = new Logger('TagsController', { timestamp: true });

  constructor(private tagService: TagsService) {
  }

  @Get()
  getTagsByBoardId(@Param('boardId') boardId: string): Promise<TagEntity[]> {
    this.logger.verbose(`User retrieving all tags from board with ID : ${boardId}`);
    return this.tagService.getTagsByBoardId(boardId);
  }

  @Put()
  createDefaultTags(
    @Param('boardId') boardId: string,
  ): Promise<any> {
    this.logger.verbose(`User create all default tags for new board with ID: ${boardId}`);
    return this.tagService.createDefaultTags(boardId);
  }

  @Post()
  createTag(
    @Param('boardId') boardId: string,
    @Body() postTagDto: PostPatchTagDto,
  ): Promise<TagEntity> {
    this.logger.verbose(`User create a tag for board with ID : "${boardId}"`);
    return this.tagService.createTag(boardId, postTagDto);
  }

}
