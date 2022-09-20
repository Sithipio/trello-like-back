import { Injectable } from '@nestjs/common';
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

  async getTagsByBoardId(boardId: string): Promise<TagEntity[]> {
    return await this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.board = :id', { id: boardId })
      .orderBy('tag.createdDate', 'ASC')
      .getMany();
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

}
