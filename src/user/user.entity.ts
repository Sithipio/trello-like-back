import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  userEmail: string;

  @Column()
  userPassword: string;

  @Column()
  userFirstName: string;

  @Column()
  userLastName: string;

  @OneToMany((_type) => Task, task => task.taskUser, { eager: false })
  userTasks: Task[];
}