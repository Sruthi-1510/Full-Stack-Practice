//import node modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
//Create Server 
const server = http.createServer((req, res) => {

//Handle URL & routing 
const parsedUrl = url.parse(req.url, true);
const pathname = parsedUrl.pathname;

//Handle GET request
if (req.method === 'GET' && pathname === '/') {
  const filePath = path.join(__dirname, 'index.html');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

//Handle POST request 
else if (req.method === 'POST' && pathname === '/submit') {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    res.writeHead(200);
    res.end('Data received: ' + body);
  });
}

//Handle unknown routes
else {
  res.writeHead(404);
  res.end('Page not found');
}

//start server
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

