import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'word' })
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'word' })
  word: string;

  @Column({ name: 'oldword' })
  oldword: string;

  @Column({ name: 'pinyin' })
  pinyin: string;

  @Column({ name: 'radicals' })
  radicals: string;

  @Column({ name: 'strokes' })
  strokes: string;

  @Column()
  explanation: string;

  @Column()
  more: string;
}
