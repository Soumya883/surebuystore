/**
 * Seed Script — creates test Admin + Customer accounts
 * Run: npx ts-node src/seed.ts
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './users/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_LhPNe5wycK3I@ep-long-voice-ayaczca1-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  entities: [User],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);

  const accounts = [
    {
      name: 'Admin User',
      email: 'admin@surebuy.com',
      password: 'admin123',
      role: UserRole.ADMIN,
    },
    {
      name: 'Test Customer',
      email: 'user@surebuy.com',
      password: 'user1234',
      role: UserRole.CUSTOMER,
    },
  ];

  for (const account of accounts) {
    const existing = await repo.findOne({ where: { email: account.email } });
    if (existing) {
      console.log(`⚠️  Skipped (already exists): ${account.email}`);
      continue;
    }

    const passwordHash = await bcrypt.hash(account.password, 10);
    const user = repo.create({
      name: account.name,
      email: account.email,
      passwordHash,
      role: account.role,
    });
    await repo.save(user);
    console.log(`✅ Created [${account.role}]: ${account.email} / ${account.password}`);
  }

  await AppDataSource.destroy();
  console.log('\n🎉 Seeding complete!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
