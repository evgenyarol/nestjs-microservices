import { Controller, UseGuards, Get, Post, Body, Request, Response, Put, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TeamLicense } from './teamlicense.entity';
import { TeamLicenseService } from './teamlicense.service';


@Controller()
export class TeamLicenseController {
  constructor(
    private readonly teamLicenseService: TeamLicenseService,
  ) { }

  // TeamLicense
  @Get('teamlicense/:id')
  async getTeamLicense(@Request() request) {
    const id = request.params.id
    return await this.teamLicenseService.getTeamLicenseById(id)
  }

  @Post('teamlicense')
  async saveTeamLicense(@Body() teamLicense: TeamLicense) {
    return this.teamLicenseService.saveTeamLicense(teamLicense);
  }

  @Put('teamlicense/:id')
  async updateTeamLicense(@Param('id') id: number, @Body() teamLicense: TeamLicense, @Response() response) {
    this.teamLicenseService.updateTeamLicenseById(id, teamLicense);
    response.json(teamLicense)
  }

}