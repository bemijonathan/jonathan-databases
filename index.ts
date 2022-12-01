import { PrismaClient, Roles } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const users = new Array(10).fill("");

const stations = new Array(5).fill("");

const trains = new Array(10).fill("");

const main = async () => {
  const userPromises = users.map(() => {
    return prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        role: Roles.CUSTOMER,
      },
    });
  });

  await Promise.all(userPromises);

  const stationPromises = stations.map(() => {
    return prisma.station.create({
      data: {
        name: faker.address.city(),
      },
    });
  });

  await Promise.all(stationPromises);

  const trainPromises = trains.map(() => {
    return prisma.train.create({
      data: {
        name: faker.company.name(),
        capacity: Number(faker.random.numeric(2)),
        departureDate: new Date(),
      },
    });
  });

  await Promise.all(trainPromises);
};

main();
