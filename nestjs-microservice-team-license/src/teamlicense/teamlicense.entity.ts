import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { TeamLicenseInterface } from './teamlicense.interface';

@Entity()
export class TeamLicense implements TeamLicenseInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  maxProfiles: number;

  @Column()
  dieTo: string;

  @Column()
  maxSubAccounts: number;

  @CreateDateColumn()
  createdAt: Date;
}