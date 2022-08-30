import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardBackground } from './board-background.model';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: BoardBackground,
    default: BoardBackground.GREY,
  })
  background: BoardBackground;

  @Column({ default: false })
  isFavorite: boolean;

  @Column()
  createDate: Date;
}
