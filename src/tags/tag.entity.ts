import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from '../boards/board.entity';
import { TaskEntity } from '../tasks/task.entity';


@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  background: string;

  @ManyToOne(() => BoardEntity, (board) => board.tag, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  board: BoardEntity;

  @ManyToMany(() => TaskEntity, (task) => task.tag)
  task: TaskEntity[];

  @Column()
  createdDate: Date;
}
