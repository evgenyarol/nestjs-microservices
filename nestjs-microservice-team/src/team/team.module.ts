import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
  ],
  providers: [
    TeamService,
  ],
  controllers: [TeamController],
})
export class TeamModule { }