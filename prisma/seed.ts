import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: {email: 'alice@openheart.quedev.xyz'},
    update: {},
    create: {
      email: 'alice@openheart.quedev.xyz',
      password:
        '$argon2i$v=19$m=4096,t=3,p=1$TMslYLNS9lbhKXPIsLgFdA$oNn88tDlM4mjih5gGtL9GHyA+fhB9MICDRxAO6yjAvc',
      firstname: 'Alice',
      lastname: 'Doe',
      gender: 'Female',
      username: 'aliced',
      location: 'Wonderland',
      bio: 'Alice in Wonderland',
      dateofbirth: new Date('1990-01-01'),
    },
  });

  const bob = await prisma.user.upsert({
    where: {email: 'bob@openheart.quedev.xyz'},
    update: {},
    create: {
      email: 'bob@openheart.quedev.xyz',
      password:
        '$argon2i$v=19$m=4096,t=3,p=1$qkQg3h2RjY1nnlA+vqapLw$dL1bQOZGl5bEoJUs9T2RetCCOe73TBmJexuqMJ2VJ+M',
      firstname: 'Bob',
      lastname: 'Frank',
      gender: 'Male',
      username: 'bobf',
      location: 'New York',
      bio: 'Bob the Builder',
      dateofbirth: new Date('1994-01-01'),
    },
  });

  console.log({alice, bob});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    throw e;
  });
