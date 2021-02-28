import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, Unique } from 'typeorm';
import { FingerPrintInterface } from '../interfaces/fingerprint.interface';

@Entity()
export class FingerPrint implements FingerPrintInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_agent: string;

  @Column()
  platform: string;

  @Column()
  device_memory: number;

  @Column()
  hardware_concurrency: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  unmasked_vendor: string;

  @Column()
  unmasked_render: string;
}