const http = require('http');
const fs = require('fs');
const path = require('path');

const frontEndPath = path.join(__dirname, '../front-end');

const server = http.createServer((req, res) => {
  let filePath = '';

  // If root path, serve index.html
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(frontEndPath, 'index.html');
  } else {
    // Serve any file from front-end folder
    filePath = path.join(frontEndPath, req.url);
  }

  // Get the file extension to determine content type
  const ext = path.extname(filePath);
  let contentType = 'text/plain';
  if (ext === '.html') contentType = 'text/html';
  else if (ext === '.css') contentType = 'text/css';
  else if (ext === '.js') contentType = 'text/javascript';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

  // Read and serve file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
