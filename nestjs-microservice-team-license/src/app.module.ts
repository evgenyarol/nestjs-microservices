import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamLicense } from './teamlicense/teamlicense.entity';
import { TeamLicenseModule } from './teamlicense/teamlicense.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: 'postgres',
    password: 'Arol3094',
    database: 'users',
    synchronize: true,
    entities: [TeamLicense]
  }), TeamLicenseModule],
})
export class AppModule { }
