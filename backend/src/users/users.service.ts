import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    try {
      const adminEmail = 'admin@surebuy.com';
      const existingAdmin = await this.findByEmail(adminEmail);
      if (!existingAdmin) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash('admin123', salt);
        const admin = this.usersRepository.create({
          name: 'Admin User',
          email: adminEmail,
          passwordHash: hash,
          role: UserRole.ADMIN,
        });
        await this.usersRepository.save(admin);
        console.log('Seeded default admin user: admin@surebuy.com / admin123');
      }
    } catch (err) {
      console.error('Failed to seed admin user:', err);
    }
  }

  async create(createUserDto: Partial<User>) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.usersRepository.find();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
