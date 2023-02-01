const fs = require("fs");
const http = require("http");

let users = [
  { name: "user1", email: "user1@gmail.com", password: "123" },
  { name: "user2", email: "user2@gmail.com", password: "456" },
  { name: "user3", email: "user3@gmail.com", password: "789" },
];

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/users") {
    const method = req.method;
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      res.end();
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const newData = JSON.parse(body);
        users.push(newData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    } else if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const newData = JSON.parse(body);
        const hasEmail = users.find((item) => item.email === newData.email);
        if (hasEmail) {
          hasEmail.name = newData.name;
          hasEmail.password = newData.password;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const newData = JSON.parse(body);
        const hasEmail = users.find((item) => item.email === newData.email);
        if (hasEmail) {
          users = users.filter((item) => item.email !== hasEmail.email);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    }
  }
});

server.listen(5500, () => {
  console.log("server is listening at port 5500");
});
