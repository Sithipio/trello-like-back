import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.model';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  taskId: string;

  @Column()
  taskName: string;

  @Column({ nullable: true })
  taskDesc: string;

  @Column({ nullable: true })
  taskTag: string;

  @Column({ nullable: true })
  taskDate: string;

  @Column({ nullable: true })
  taskBackground: string;

  @ManyToOne((_type) => User, user => user.tasks, { eager: true })
  @Exclude({ toPlainOnly: true })
  taskUser: string;

  @Column()
  taskStatus: TaskStatus;

}
