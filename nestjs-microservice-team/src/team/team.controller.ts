import { Controller, UseGuards, Get, Post, Body, Request, Response, Put, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller()
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
  ) { }

  // Team
  @Get('team/:id')
  @UseGuards(JwtAuthGuard)
  async getTeamLicense(@Request() request) {
    const id = request.params.id
    return await this.teamService.getTeamById(id)
  }

  @Post('team')
  @UseGuards(JwtAuthGuard)
  async saveBrowserProfile(@Body() team: Team) {
    return this.teamService.saveTeam(team);
  }

  @Put('team/:id')
  @UseGuards(JwtAuthGuard)
  async updateTeam(@Param('id') id: number, @Body() team: Team, @Response() response) {
    this.teamService.updateTeamById(id, team);
    response.json(team)
  }

}