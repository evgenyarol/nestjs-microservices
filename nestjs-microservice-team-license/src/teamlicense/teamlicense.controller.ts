import { Controller, UseGuards, Get, Post, Body, Request, Response, Put, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TeamLicense } from './teamlicense.entity';
import { TeamLicenseService } from './teamlicense.service';


@Controller()
export class TeamLicenseController {
  constructor(
    private readonly teamLicenseService: TeamLicenseService,
  ) { }

  // BrowserProfile
  @Get('teamlicense/:id')
  async getTeamLicense(@Request() request) {
    const id = request.params.id
    return await this.teamLicenseService.getTeamLicenseById(id)
  }

  @Post('teamlicense')
  async saveBrowserProfile(@Body() teamLicense: TeamLicense) {
    return this.teamLicenseService.saveTeamLicense(teamLicense);
  }

  @Put('teamlicense/:id')
  updateGeo(@Param('id') id: number, @Body() teamLicense: TeamLicense, @Response() response) {
    this.teamLicenseService.updateTeamLicenseById(id, teamLicense);
    response.json(teamLicense)
  }

}