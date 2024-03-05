import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'default_theme' })
export class Themes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'value' })
  value: string;
}
