import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BoardBackground } from './board-background.model';
import { ColumnEntity } from '../columns/column.entity';
import { TaskEntity } from '../tasks/task.entity';
import { TagEntity } from '../tags/tag.entity';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: BoardBackground,
    default: BoardBackground.GREY,
  })
  background: BoardBackground;

  @Column({ default: false })
  isFavorite: boolean;

  @Column()
  createdDate: Date;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  @Exclude({ toPlainOnly: true })
  column: ColumnEntity[];

  @OneToMany(() => TaskEntity, (task) => task.board)
  @Exclude({ toPlainOnly: true })
  task: TaskEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.board)
  @Exclude({ toPlainOnly: true })
  tag: TagEntity[];
}
