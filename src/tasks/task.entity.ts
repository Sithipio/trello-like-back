import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserEntity } from '../user/user.entity';
import { TaskBackground, TaskStatus } from './enums';
import { ColumnEntity } from '../columns/column.entity';
import { BoardEntity } from '../boards/board.entity';
import { TagEntity } from '../tags/tag.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ default: '' })
  background: TaskBackground;

  @ManyToOne((_type) => UserEntity, user => user.tasks)
  @Exclude({ toPlainOnly: true })
  user: string;

  @Column()
  status: TaskStatus;

  @Column()
  order: number;

  @ManyToOne(() => BoardEntity, (board) => board.task, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  board: BoardEntity;

  @ManyToOne(() => ColumnEntity, (column) => column.task, {onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  column: ColumnEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.task)
  @JoinTable({name: 'task_tag_entity'})
  tag: TagEntity[];
}
