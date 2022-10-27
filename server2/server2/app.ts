import http, { IncomingMessage, Server, ServerResponse } from "http";
import https from "https"
/*
implement your server code here
*/
let url = 'https://www.google.com' //The url 
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      https.get(url, (response: any)=>{
        let dataOne = ''
        response.on('data', (chunk: any)=>{
          dataOne+=chunk.toString()
        })
        response.on('end', ()=>{
          
          let splitArray = dataOne.split("</title>")[0]
          let titleSplit = splitArray.split("<title>")[1]
          res.end(JSON.stringify(
            {
              Title: titleSplit,
              Description: 0,
              ImageUrl: 3
            }
            ));
        })
        response.on('error', ()=>{
          console.error("An error ocurred")
        })
      })
      
    }
  }
);

server.listen(3001, ()=>{
  console.log("Kenneth is typing and has set up his server at port 3001")
});
