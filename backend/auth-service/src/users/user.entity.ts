import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../common/constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;
}
