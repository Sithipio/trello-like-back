import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BoardEntity } from '../boards/board.entity';


@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => BoardEntity, (board) => board.column, { cascade: true, onDelete: "CASCADE" })
  board: BoardEntity;

}
