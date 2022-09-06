import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BoardBackground } from './board-background.model';
import { ColumnEntity } from '../column/column.entity';

@Entity()
export class BoardEntity {
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

  @OneToMany(() => ColumnEntity, (column) => column.board)
  @Exclude({ toPlainOnly: true })
  @JoinColumn({ name: 'board' })
  column: ColumnEntity[];
}
