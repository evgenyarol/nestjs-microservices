import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: 'postgres',
    password: 'Arol3094',
    database: 'users',
    synchronize: true,
    entities: [User]
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
