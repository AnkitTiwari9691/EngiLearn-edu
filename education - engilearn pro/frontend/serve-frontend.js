const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 5089);
const root = __dirname;
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  let requestPath = decodeURIComponent(req.url.split("?")[0]);
  if (requestPath === "/") requestPath = "/index.html";

  const file = path.normalize(path.join(root, requestPath));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": requestPath.endsWith(".html") ? "no-store" : "no-cache",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
    });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Frontend running at http://localhost:${port}`);
});
