import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('boards')
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  boardId: string;

  @Column()
  boardName: string;

  @Column({ nullable: true })
  boardBackground: string;

  @Column()
  boardFavorite: boolean;

}