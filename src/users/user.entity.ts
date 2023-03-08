import { Report } from 'src/reports/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  // Generate string ID
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Report, report => report.user)
  reports: Report[];
}