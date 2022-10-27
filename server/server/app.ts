import http from "http";
const {
  getAllOrganization,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../lib/controller");
// const Controller = require("../lib/controller");
/*
implement your server code here
*/

const server = http.createServer((req, res) => {
  // Get all organization
  if (
    req.method === "GET" &&
    (req.url === "/organization" || req.url === "/organization/")
  ) {
    getAllOrganization(req, res);

    // Get single organization
  } else if (
    req.url?.match(/\/organization\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[2];
    getOrganization(req, res, id);

    // create organization
  } else if (req.url === "/organization/create" && req.method === "POST") {
    createOrganization(req, res);

    // Update a single organization
  } else if (
    req.url?.match(/\/organization\/update\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateOrganization(req, res, id);

    // Delete a single organization
  } else if (
    req.url?.match(/\/organization\/delete\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteOrganization(req, res, id);

    // invalid url passed
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not Found" }));
  }
});

const PORT = 3005;
server.listen(PORT, () => console.log("Server is running on port: " + PORT));
