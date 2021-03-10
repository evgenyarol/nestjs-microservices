import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamLicense } from './teamlicense.entity';
import { TeamLicenseService } from './teamlicense.service';
import { TeamLicenseController } from './teamlicense.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamLicense]),
  ],
  providers: [
    TeamLicenseService,
  ],
  controllers: [TeamLicenseController],
})
export class TeamLicenseModule { }