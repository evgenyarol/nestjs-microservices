import { Controller, UseGuards, Get, Post, Body, Request, Response, Put, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TeamLicense } from './teamlicense.entity';
import { TeamLicenseService } from './teamlicense.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller()
export class TeamLicenseController {
  constructor(
    private readonly teamLicenseService: TeamLicenseService,
  ) { }

  // TeamLicense
  @Get('teamlicense/:id')
  @UseGuards(JwtAuthGuard)
  async getTeamLicense(@Request() request) {
    const id = request.params.id
    return await this.teamLicenseService.getTeamLicenseById(id)
  }
  
  @Post('teamlicense')
  @UseGuards(JwtAuthGuard)
  async saveTeamLicense(@Body() teamLicense: TeamLicense) {
    return this.teamLicenseService.saveTeamLicense(teamLicense);
  }
  
  @Put('teamlicense/:id')
  @UseGuards(JwtAuthGuard)
  async updateTeamLicense(@Param('id') id: number, @Body() teamLicense: TeamLicense, @Response() response) {
    this.teamLicenseService.updateTeamLicenseById(id, teamLicense);
    response.json(teamLicense)
  }

}