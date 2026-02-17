const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Seed Levels
  await prisma.level.upsert({
    where: { id: 1 },
    update: { name: 'Administrator' },
    create: { id: 1, name: 'Administrator' },
  })
  await prisma.level.upsert({
    where: { id: 2 },
    update: { name: 'Officer' },
    create: { id: 2, name: 'Officer' },
  })

  // Hash password dengan bcryptjs ($2a$ prefix)
  const hashedPw = await hash('123456', 12)

  // Seed/Update Admin
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: { password: hashedPw },
    create: {
      officerName: 'Administrator',
      username: 'Administrator',
      email: 'admin@gmail.com',
      phoneNumber: '088228740010',
      photo: '',
      password: hashedPw,
      levelId: 1,
    },
  })

  // Seed/Update Officer
  await prisma.user.upsert({
    where: { email: 'officer@gmail.com' },
    update: { password: hashedPw },
    create: {
      officerName: 'Officer',
      username: 'Officer',
      email: 'officer@gmail.com',
      phoneNumber: '088228740010',
      photo: '',
      password: hashedPw,
      levelId: 2,
    },
  })

  console.log('✅ Seeding complete! Password: 123456')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
