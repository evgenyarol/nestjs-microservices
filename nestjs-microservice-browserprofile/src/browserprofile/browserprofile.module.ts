import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FingerPrint } from './entities/fingerprint.entity';
import { FingerPrintService } from './services/fingerprint.service';
import { Geo } from './entities/geo.entity';
import { GeoService } from './services/geo.service';
import { Cookie } from './entities/cookie.entity';
import { CookieService } from './services/cookie.service';
import { Proxy } from './entities/proxy.entity';
import { ProxyService } from './services/proxy.service';
import { BrowserProfile } from './entities/browserprofile.entity';
import { BrowserProfileService } from './browserprofile.service';
import { ManualFingerPrint } from './entities/manualfingerprint.entity';
import { ManualFingerPrintService } from './services/manualfingerprint.service';
import { UserController } from './browserprofile.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([FingerPrint]),
    TypeOrmModule.forFeature([Geo]),
    TypeOrmModule.forFeature([Cookie]),
    TypeOrmModule.forFeature([Proxy]),
    TypeOrmModule.forFeature([BrowserProfile]),
    TypeOrmModule.forFeature([ManualFingerPrint]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000
      }
    }])
  ],
  providers: [
    FingerPrintService,
    GeoService,
    CookieService,
    ProxyService,
    BrowserProfileService,
    ManualFingerPrintService
  ],
  controllers: [UserController],
})
export class BrowserProfileModule { }