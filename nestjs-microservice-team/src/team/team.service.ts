import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>
    ) { }

    async saveTeam(team: Team): Promise<Team> {
        return await this.teamRepository.save({ ...team });
    }

    async getTeamById(id: number): Promise<Team> {
        const team = await this.teamRepository.findOne({ where: { id } }); 
        if (!team) {
            return null
        }
        return team
    }

    async updateTeamById(id : number, team: Team): Promise<any> {
        return await this.teamRepository.update(id, team);
    }
    
}