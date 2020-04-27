const faker = require("faker");
const date = require("date-fns");
const db = require("../../../../data/dbConfig");

const randomNumberGenerator = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Generates fake records that conform to schema of the uscounties table.
const buildUsCountiesRecords = (
  records,
  [minCases, maxCases],
  [minAgeofRecords, maxAgeofRecord]
) =>
  [...Array(records)].map(() => ({
    cases: randomNumberGenerator(minCases, maxCases),
    city: faker.address.city(),
    citycode: faker.address.zipCode(),
    country: faker.address.country(),
    countrycode: faker.address.countryCode(),
    date: faker.date.between(
      date.subDays(
        new Date(),
        randomNumberGenerator(minAgeofRecords, maxAgeofRecord)
      ),
      date.subDays(new Date(), minAgeofRecords)
    ),
    lat: Number(faker.address.latitude()),
    lon: Number(faker.address.longitude()),
    province: faker.address.state(),
    status: faker.hacker.adjective(),
  }));

/*
 * Because DS handles all data input, we have no method for inserting data into the DB.
 * However, this method allows us to insert for testing purposes.
 */
const insertIntoUsCounties = (records) => db("uscounties").insert(records);

module.exports = {
  buildUsCountiesRecords,
  insertIntoUsCounties,
  randomNumberGenerator,
};
