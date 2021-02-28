import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, Unique } from 'typeorm';
import { hash } from 'bcrypt';
import { IsEmail, Min } from 'class-validator';
import { AuthInterface } from './auth.interface';

@Entity()
@Unique(['email'])
export class User implements AuthInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  refUrl: string;

  @Column()
  @Min(8)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  isEmailVerified: false;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}