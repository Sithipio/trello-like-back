import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserEntity } from '../user/user.entity';
import { TaskBackground, TaskStatus } from './enums';
import { ColumnEntity } from '../column/column.entity';

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

  @ManyToOne(() => ColumnEntity, (column) => column.task, { cascade: true, onDelete: "CASCADE" })
  column: ColumnEntity;

}
