import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DEFAULT_TAGS } from './default-tags.constant';
import { TagEntity } from './tag.entity';
import { IPostPatchTag } from './interfaces';

@Injectable()
export class TagsService {

  constructor(
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {
  }

  async getTags(boardId: string): Promise<TagEntity[]> {
    return await this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.board = :id', { id: boardId })
      .orderBy('tag.createdDate', 'ASC')
      .getMany();
  }

  async getTag(tagId: string): Promise<TagEntity> {
    return await this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.id = :tagId', { tagId })
      .getOne();
  }

  async createDefaultTags(boardId: string): Promise<any> {
    await Promise.all(
      DEFAULT_TAGS.map(async (item) => {
          await this.tagsRepository
            .createQueryBuilder('tag')
            .insert()
            .values({
              ...item,
              board: {
                id: boardId,
              },
            })
            .execute();
        },
      ),
    );
  }

  async createTag(boardId, postTag: IPostPatchTag): Promise<TagEntity> {
    const tag = this.tagsRepository.create({
      ...postTag,
      board: boardId,
      createdDate: new Date(),
    });

    return await this.tagsRepository.save(tag);
  }

  async updateTag(tagId: string, newData: {}): Promise<TagEntity> {
    const tag = await this.getTag(tagId);

    return this.tagsRepository.save({ ...tag, ...newData });
  }

  async deleteTag(tagId: string): Promise<void> {
    const found = await this.tagsRepository.find({
      where: { id: tagId },
    });

    if (!found) {
      throw new NotFoundException((`Tag with ID: "${tagId}" not found`));
    }

    await this.tagsRepository.delete(tagId);
  }

  async toggleOnTagToTask(tagId: string, taskId: string): Promise<void> {
    return await this.tagsRepository
      .createQueryBuilder()
      .relation(TagEntity, 'task')
      .of(tagId)
      .add(taskId);
  }

  async toggleOffTagToTask(tagId: string, taskId: string): Promise<void> {
    return await this.tagsRepository
      .createQueryBuilder()
      .relation(TagEntity, 'task')
      .of(tagId)
      .remove(taskId);
  }

}
