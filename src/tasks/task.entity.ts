import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserEntity } from '../user/user.entity';
import { TaskBackground, TaskStatus } from './enums';
import { ColumnEntity } from '../column/column.entity';
import { BoardEntity } from '../boards/board.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
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

  @ManyToOne(() => ColumnEntity, (column) => column.task, {eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'column' })
  column: ColumnEntity;
}
