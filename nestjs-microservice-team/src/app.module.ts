import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team/team.entity';
import { TeamModule } from './team/team.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: 'postgres',
    password: 'Arol3094',
    database: 'users',
    synchronize: true,
    entities: [Team]
  }), TeamModule],
})
export class AppModule { }
