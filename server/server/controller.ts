// ******************This file interact with model, it sends output response gotten from model ********************
const Model = require("../lib/model");
const Util = require("../lib/utils");
import { IncomingMessage, ServerResponse } from "http";

// Get all organization
async function getAllOrganization(req: IncomingMessage, res: ServerResponse) {
  try {
    const org = await Model.allOrganization();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(org));
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
}

// Get single organization
async function getOrganization(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const single_org = await Model.singleOrganization(id);
    if (!single_org) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organization not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(single_org));
    }
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
}

// create organization
async function createOrganization(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await Util.getPostData(req);

    const bodyData = JSON.parse(body);
    const new_org = {
      organization: bodyData.organization,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      products: bodyData.products,
      marketValue: bodyData.marketValue,
      address: bodyData.address,
      ceo: bodyData.ceo,
      country: bodyData.country,
      id: bodyData.id,
      noOfEmployees: bodyData.noOfEmployees,
      employees: bodyData.employees,
    };
    const newOrg = await Model.createOrganization(new_org);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Organization with id '${newOrg.id}' created successfully`,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

// Update a single organization
async function updateOrganization(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const single_org = await Model.singleOrganization(id);

    if (!single_org) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organization not found" }));
    } else {
      const bodyData = JSON.parse(await Util.getPostData(req));

      const update_org = {
        organization: bodyData.organization || single_org.organization,
        createdAt: single_org.createdAt,
        updatedAt: new Date().toISOString() || single_org.updatedAt,
        products: bodyData.products || single_org.products,
        marketValue: bodyData.marketValue || single_org.marketValue,
        address: bodyData.address || single_org.address,
        ceo: bodyData.ceo || single_org.ceo,
        country: bodyData.country || single_org.country,
        id: bodyData.id || single_org.id,
        noOfEmployees: bodyData.noOfEmployees || single_org.noOfEmployees,
        employees: bodyData.employees || single_org.employees,
      };
      await Model.updateOrganization(id, update_org);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Organization with id '${id}' updated successfully`,
        })
      );
    }
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
}

// delete organization
async function deleteOrganization(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const single_org = await Model.singleOrganization(id);

    if (!single_org) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organization not found" }));
    } else {
      await Model.deleteOrganization(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Organization with id '${id}' deleted successfully`,
        })
      );
    }
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
}

module.exports = {
  getAllOrganization,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
