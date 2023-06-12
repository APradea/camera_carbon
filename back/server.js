const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "POST") {
    // Handle the image upload
    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      body = Buffer.concat(body);

      // Generate a unique filename
      const filename = `image_${Date.now()}.jpeg`;

      // Save the image to disk
      fs.writeFile(filename, body, (error) => {
        if (error) {
          res.statusCode = 500;
          res.end("Error saving the image");
        } else {
          res.statusCode = 200;
          res.end("Image uploaded successfully");
        }
      });
    });
  } else {
    // Handle other routes
    res.statusCode = 404;
    res.end("Not found");
  }
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
