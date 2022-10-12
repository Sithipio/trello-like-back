import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
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
  getTags(@Param('boardId') boardId: string): Promise<TagEntity[]> {
    this.logger.verbose(`User retrieving all tags from board with ID : ${boardId}`);
    return this.tagService.getTags(boardId);
  }

  @Get('/:tagId')
  getTag(@Param('tagId') tagId: string): Promise<TagEntity> {
    this.logger.verbose(`User retrieving tag with ID: ${tagId}`);
    return this.tagService.getTag(tagId);
  }

  @Put()
  createDefaultTags(
    @Param('boardId') boardId: string,
  ): Promise<TagEntity> {
    this.logger.verbose(`User create all default tags for new board with ID: ${boardId}`);
    return this.tagService.createDefaultTags(boardId);
  }

  @Post()
  createTag(
    @Param('boardId') boardId: string,
    @Body() postPatchTagDto: PostPatchTagDto,
  ): Promise<TagEntity> {
    this.logger.verbose(`User create a tag "${postPatchTagDto.name}" for board with ID : "${boardId}"`);
    return this.tagService.createTag(boardId, postPatchTagDto);
  }

  @Patch('/:tagId')
  updateTag(
    @Param('tagId') tagId: string,
    @Body() postPatchTagDto: PostPatchTagDto,
  ): Promise<TagEntity> {
    this.logger.verbose(`User create a tag "${postPatchTagDto.name}" with ID : "${tagId}"`);
    return this.tagService.updateTag(tagId, postPatchTagDto);
  }

  @Put('/:tagId/on')
  toggleOnTagToTask(
    @Param('tagId') tagId: string,
    @Body('taskId') taskId: string,
  ): Promise<void> {
    this.logger.verbose(`User toggle on tag with ID: ${tagId} in task with ID : "${taskId}"`);
    return this.tagService.toggleOnTagToTask(tagId, taskId);
  }

  @Put('/:tagId/off')
  toggleOffTagToTask(
    @Param('tagId') tagId: string,
    @Body('taskId') taskId: string,
  ): Promise<void> {
    this.logger.verbose(`User toggle off tag with ID: ${tagId} in task with ID : "${taskId}"`);
    return this.tagService.toggleOffTagToTask(tagId, taskId);
  }

  @Delete('/:tagId')
  deleteTag(@Param('tagId') tagId: string): Promise<void> {
    this.logger.verbose(`User deleted a tag with ID: "${tagId}"`);
    return this.tagService.deleteTag(tagId);
  }

}
