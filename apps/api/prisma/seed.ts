import { PrismaClient } from '../src/generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const DEFAULT_TEAMS = [
  { name: 'Flamengo', state: 'RJ', division: 'A' },
  { name: 'Palmeiras', state: 'SP', division: 'A' },
  { name: 'Fortaleza', state: 'CE', division: 'A' },
  { name: 'Ceará', state: 'CE', division: 'B' },
  { name: 'Botafogo', state: 'RJ', division: 'A' },
  { name: 'Sport', state: 'PE', division: 'B' },
]

async function main() {
  for (const team of DEFAULT_TEAMS) {
    await prisma.team.upsert({
      where: { name: team.name },
      update: {},
      create: team,
    })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    throw new Error('Variáveis de ambiente ADMIN_EMAIL e ADMIN_PASSWORD são obrigatórias.')
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10)

  await prisma.adminsys.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, password: passwordHash },
  })

  console.log('Seed concluído.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())