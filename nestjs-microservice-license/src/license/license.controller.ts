import { Controller, UseGuards, Get, Post, Body, Request, Response, Put, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { License } from './license.entity';
import { LicenseService } from './license.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller()
export class LicenseController {
  constructor(
    private readonly licenseService: LicenseService,
  ) { }

  // License
  @Get('license/:id')
  @UseGuards(JwtAuthGuard)
  async getLicense(@Request() request) {
    const id = request.params.id
    return await this.licenseService.getLicenseByIdWithCreatorId(id)
  }
  
  @Post('license')
  @UseGuards(JwtAuthGuard)
  async saveLicense(@Body() license: License) {
    return this.licenseService.saveLicense(license);
  }
  
  @Put('license/:id')
  @UseGuards(JwtAuthGuard)
  async updateLicense(@Param('id') id: number, @Body() license: License, @Response() response) {
    this.licenseService.updateLicenseById(id, license);
    response.json(license)
  }

  @MessagePattern({ role: 'license', cmd: 'get' })
  async getProfileById(id): Promise<License> {
    return this.licenseService.getLicenseById(id);
  }
}