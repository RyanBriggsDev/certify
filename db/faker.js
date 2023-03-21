const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const args = process.argv;
const numberOfRecords = args[2] ? args[2] : 0;

const getAdminIds = async () => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
      },
    });
    const ids = admins.map((item) => {
      return item.id;
    });
    return ids;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createFakeCourses = async (numberOfRecords) => {
  try {
    //Create fake courses
    const fakeCourses = [];
    for (let i = 0; i < numberOfRecords; i++) {
      const course = {
        name: faker.company.catchPhrase(),
        type: faker.helpers.arrayElement(["beginner", "intermediate", "advanced"]),
        description: faker.lorem.paragraph(),
        location: faker.helpers.arrayElement(["virtual", "classroom", "distance"]),
        startDate: faker.date.between("2020-01-01T00:00:00.000Z", "2023-01-01T00:00:00.000Z"),
        endDate: faker.date.between("2023-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z"),
        active: true,
        adminId: faker.helpers.arrayElement(await getAdminIds()),
      };
      fakeCourses.push(course);
    }
    //Add to database
    const createdCourses = await prisma.course.createMany({
      data: fakeCourses,
    });
    console.log(`Success : Created ${createdCourses.count} new courses`);
  } catch (error) {
    console.log(error);
  }
};

const createFakeCandidates = async (numberOfRecords) => {
  try {
    //Create fake candidates
    const fakeCandidates = [];
    for (let i = 0; i < numberOfRecords; i++) {
      const candidate = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        address: `
            ${faker.address.streetAddress()},
            ${faker.address.city()},
            ${faker.address.state()},
            ${faker.address.zipCode()}
        `,
        telephoneNumber: faker.phone.number(),
        createdById: faker.helpers.arrayElement(await getAdminIds()),
      };
      fakeCandidates.push(candidate);
    }
    //Add to database
    const createdCandidates = await prisma.candidate.createMany({
      data: fakeCandidates,
    });
    console.log(`Success : Created ${createdCandidates.count} new candidates`);
  } catch (error) {
    console.log(error);
  }
};

/*
  Run Script
*/

if (numberOfRecords > 0 && numberOfRecords <= 100) {
  createFakeCourses(numberOfRecords);
  createFakeCandidates(numberOfRecords);
} else if (numberOfRecords > 100) {
  console.error("Error: Cannot create more than 100 at one time");
} else {
  console.error("Error: No data created as no arguments passed");
}
