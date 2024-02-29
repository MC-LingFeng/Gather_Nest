import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  // @Column({ name: 'user_id' })
  // user_id: string;

  @Column()
  username: string;

  @Column()
  password_encrypted: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'mail' })
  mail: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'password_tag' })
  password_tag: string;

  @Column({ name: 'password_key' })
  password_key: string;

  @Column({ name: 'password_vector' })
  password_vector: string;

  @Column({ name: 'password_algorithm' })
  password_algorithm: string;

  @Column({ name: 'grade' })
  grade: number;
}
