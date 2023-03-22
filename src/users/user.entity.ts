import { Role } from 'src/enums/roles.enum';
import { Report } from 'src/reports/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  // Generate string ID
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  username: string;

  // Will be changed later, only done for course purposes
  @Column({ default: false })
  admin: boolean;

  @Column({ nullable: true })
  // @Column({ default: 'admin' })
  roles: string;

  @Column()
  password: string;

  @OneToMany(() => Report, report => report.user)
  reports: Report[];
}