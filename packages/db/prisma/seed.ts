import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      contact: 1234,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      contact: 98,
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
