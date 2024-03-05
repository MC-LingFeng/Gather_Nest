import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'routes_path' })
export class RoutesPath {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  name: string;

  @Column({ name: 'father_path' })
  father_path: string;

  @Column({ name: 'sort' })
  sort: number;

  @Column({ name: 'user' })
  user: number;
}
