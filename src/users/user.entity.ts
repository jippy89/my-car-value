import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  // Generate string ID
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;
}