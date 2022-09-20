import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BoardEntity } from '../boards/board.entity';
import { Exclude } from 'class-transformer';
import { TaskEntity } from '../tasks/task.entity';


@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => BoardEntity, (board) => board.column, { onDelete: 'CASCADE' })
  board: BoardEntity;

  @OneToMany(() => TaskEntity, (task) => task.column, { onUpdate: 'CASCADE' })
  @Exclude({ toPlainOnly: true })
  @JoinColumn({ name: 'columnId' })
  task: TaskEntity[];
}
