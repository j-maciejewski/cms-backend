import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const prisma = new PrismaClient();

const categoriesData = [
  { name: 'World', slug: 'world' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Science', slug: 'science' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Health', slug: 'health' },
  { name: 'Arts', slug: 'arts' },
];

async function main() {
  const categories = await prisma.$transaction(
    categoriesData.map((categoryData) =>
      prisma.category.create({ data: categoryData }),
    ),
  );

  const users = Array(getRandomNumber(16, 20))
    .fill(null)
    .map(() => ({
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
    }));

  for (let user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        articles: {
          create: Array(getRandomNumber(6, 10))
            .fill(null)
            .map(() => ({
              title: faker.lorem.paragraph({ min: 1, max: 2 }),
              leadImage: `${getRandomNumber(1, 20)}.jpg`,
              content: faker.lorem.paragraphs(5, '<br/>'),
              slug: faker.lorem.slug(5),
              category: {
                connect: {
                  id: categories[getRandomNumber(0, categories.length - 1)].id,
                },
              },
            })),
        },
      },
    });
  }

  const messages = Array(25)
    .fill(null)
    .map(() => ({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      content: faker.lorem.paragraphs(5, '\n'),
    }));

  await prisma.$transaction(
    messages.map((messageData) => prisma.message.create({ data: messageData })),
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
