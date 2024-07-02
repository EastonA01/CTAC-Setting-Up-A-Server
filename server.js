// http and url modules
const http = require('http'); 
const url = require('url');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;  // Parse the URL to find the path

  // Routing logic based on the path
  if (pathname === '/') { // Respond with simple html page when root route is accessed
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');  // Set the Content-Type header to text/html
    fs.createReadStream('index.html').pipe(res) // Send HTML content for the home page
  } else if (pathname === '/api') { // Respond with JSON object w/ a greeting message upon accessing
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Welcome to the API section!' }));
  } else {
    res.statusCode = 404;  // Set HTTP status code to 404 Not Found
    res.setHeader('Content-Type', 'text/html');  // Set the Content-Type header to text/html
    res.end('<h1>Page Not Found</h1>');  // Send HTML content for a 404 error
  }
});

const PORT = 3000;  // Define the port number to listen on
server.listen(PORT, () => {  // Start the server and listen on the specified port
  console.log(`Server running at http://localhost:${PORT}/`);  // Log a message when the server starts successfully
});