import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { team_license_host } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: team_license_host,
      port: 4030
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3030);
  Logger.log('Team License microservice running');
}
bootstrap();
