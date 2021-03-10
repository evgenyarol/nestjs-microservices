import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamLicense } from './teamlicense.entity';

@Injectable()
export class TeamLicenseService {
    constructor(
        @InjectRepository(TeamLicense)
        private readonly teamLicenseRepository: Repository<TeamLicense>
    ) { }

    async saveTeamLicense(teamLicense: TeamLicense): Promise<TeamLicense> {
        return await this.teamLicenseRepository.save({ ...teamLicense });
    }

    async getTeamLicenseById(id: number): Promise<TeamLicense> {
        const teamLicense = await this.teamLicenseRepository.findOne({ where: { id } }); 
        if (!teamLicense) {
            return null
        }
        return teamLicense
    }

    async updateTeamLicenseById(id : number, teamLicense: TeamLicense): Promise<any> {
        return await this.teamLicenseRepository.update(id, teamLicense);
    }
    
}