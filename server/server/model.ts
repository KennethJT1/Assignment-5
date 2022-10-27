// ******************This file interact with the database.json array objects ********************
let database = require("../server/database.json");
const Util = require("../lib/utils");

function allOrganization() {
  return new Promise((resolve, reject) => {
    resolve(database);
  });
}

function singleOrganization(id: number) {
  return new Promise((resolve, reject) => {
    resolve(
      database.find((org_data: Record<string, number>) => org_data.id == id)
    );
  });
}

function createOrganization(new_org: Record<string, number>) {
  return new Promise((resolve, reject) => {
    database.push(new_org);
    database.map(
      (data: Record<string, number>, index: number) => (data.id = index + 1)
    );
    Util.writeDataToFile("../server/server/database.json", database);
    resolve(new_org);
  });
}

function updateOrganization(
  id: number,
  updatedValue: Record<string, number | string | string[]>
) {
  return new Promise((resolve, reject) => {
    const index = database.findIndex(
      (data: Record<string, number | string | string[]>) => data.id == id
    );
    database[index] = updatedValue;
    Util.writeDataToFile("../server/server/database.json", database);
    resolve(database[index]);
  });
}

function deleteOrganization(id: number) {
  return new Promise((resolve, reject) => {
    database = database.filter(
      (data: Record<string, number | string | string[]>) => data.id != id
    );
    Util.writeDataToFile("../server/server/database.json", database);
    resolve("deleted");
  });
}

module.exports = {
  allOrganization,
  singleOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
