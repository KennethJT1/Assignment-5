"use strict";
// import http, { IncomingMessage, Server, ServerResponse } from "http";
/*
implement your server code here
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const server: Server = http.createServer(
//   (req: IncomingMessage, res: ServerResponse) => {
//     if (req.method === "GET") {
//       res.end(JSON.stringify({ name: "hello" }));
//     }
//   }
// );
const http_1 = __importDefault(require("http"));
const https = require("https");
const cheerio = require("cheerio");
const server = http_1.default.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/scrap") {
        //Get user Input
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            let url = JSON.parse(body);
            https
                .get(url.url, (respo) => {
                let data = "";
                respo.on("data", (chunk) => {
                    data += chunk;
                });
                //scraping of website
                respo.on("end", () => {
                    const $ = cheerio.load(data);
                    const dataArray = [];
                    let title = $("head title").text();
                    let description = $('meta[name="description"]').attr("content");
                    $("img").each((index, image_src) => {
                        let image = $(image_src).attr("src");
                        dataArray.push({
                            title,
                            description,
                            image,
                        });
                        //console.log(dataArray)
                    });
                    res.end(JSON.stringify(dataArray, null, " "));
                });
            })
                .on("error", (err) => {
                res.end("Error :" + err.message);
            });
        });
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});
const PORT = 3000;
server.listen(PORT, () => console.log("server is running on port " + PORT));
// server.listen(3001);
