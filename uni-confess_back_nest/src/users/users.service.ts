import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.ensureDefaultAdmin();
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email: email.trim().toLowerCase(), isActive: true },
    });
  }

  private async ensureDefaultAdmin() {
    const email = this.configService.getOrThrow<string>('ADMIN_EMAIL');
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      return;
    }

    const password = this.configService.getOrThrow<string>('ADMIN_PASSWORD');
    const saltRounds = Number(
      this.configService.get<string>('BCRYPT_SALT_ROUNDS', '10'),
    );
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await this.usersRepository.save(
      this.usersRepository.create({
        name: 'Administrador',
        email,
        passwordHash,
      }),
    );
  }
}
