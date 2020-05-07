exports.up = (knex) =>
  knex.schema.createTable("uscounties", (table) => {
    table.increments();
    table.integer("cases");
    table.string("city");
    table.string("citycode");
    table.string("country");
    table.string("countrycode");
    table.dateTime("date", { useTz: false });
    table.float("lat");
    table.float("lon");
    table.string("province");
    table.string("status");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("uscounties");
