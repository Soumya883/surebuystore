import { Controller, Get, Post, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @Get()
  getHello(): string {
    return 'SureBuyStore API is live! Visit /api for docs.';
  }

  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Post('seed')
  async seed() {
    const accounts = [
      { name: 'Admin User',    email: 'admin@surebuy.com', password: 'admin123',  role: UserRole.ADMIN },
      { name: 'Test Customer', email: 'user@surebuy.com',  password: 'user1234',  role: UserRole.CUSTOMER },
    ];

    const results: string[] = [];
    for (const account of accounts) {
      const existing = await this.userRepo.findOne({ where: { email: account.email } });
      if (existing) {
        results.push(`Skipped (already exists): ${account.email}`);
        continue;
      }
      const passwordHash = await bcrypt.hash(account.password, 10);
      const user = this.userRepo.create({ name: account.name, email: account.email, passwordHash, role: account.role });
      await this.userRepo.save(user);
      results.push(`Created [${account.role}]: ${account.email}`);
    }

    return { success: true, results };
  }
}
