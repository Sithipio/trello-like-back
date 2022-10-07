import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TaskEntity } from '../tasks/task.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany((_type) => TaskEntity, task => task.user, { eager: false })
  tasks: TaskEntity[];
}
