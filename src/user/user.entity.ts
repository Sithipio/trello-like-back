import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}