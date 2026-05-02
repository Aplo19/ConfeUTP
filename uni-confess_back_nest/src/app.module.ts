import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT', '3306')),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.getOrThrow<string>('DB_DATABASE'),
        entities: [User],
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
