import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.model";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
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

  @Column({ nullable: true })
  taskUser: boolean;

  @Column()
  taskStatus: TaskStatus;

}
