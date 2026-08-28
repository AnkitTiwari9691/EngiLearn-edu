const express = require("express");
const http = require("http");
const path = require("path");

const PORT = Number(process.env.TUNNEL_PORT || 5500);
const BACKEND_HOST = process.env.BACKEND_HOST || "127.0.0.1";
const BACKEND_PORT = Number(process.env.BACKEND_PORT || 5021);
const ROOT_DIR = __dirname;
const FRONTEND_DIR = path.join(ROOT_DIR, "frontend");
const app = express();

function proxyToBackend(req, res) {
    const headers = { ...req.headers, host: `${BACKEND_HOST}:${BACKEND_PORT}` };
    delete headers.origin;

    const proxy = http.request({
        hostname: BACKEND_HOST,
        port: BACKEND_PORT,
        path: req.originalUrl,
        method: req.method,
        headers
    }, (backendResponse) => {
        res.statusCode = backendResponse.statusCode || 502;
        Object.entries(backendResponse.headers).forEach(([name, value]) => {
            if (value !== undefined) res.setHeader(name, value);
        });
        backendResponse.pipe(res);
    });

    proxy.on("error", () => {
        if (!res.headersSent) {
            res.status(502).json({ message: "EngiLearn backend is unavailable. Start the backend on port 5021." });
        } else {
            res.end();
        }
    });
    req.pipe(proxy);
}

app.use("/api", proxyToBackend);
app.use("/uploads", proxyToBackend);
app.use("/pyq-files", proxyToBackend);
app.use("/frontend", express.static(FRONTEND_DIR));
app.use(express.static(FRONTEND_DIR));
app.get("/", (req, res) => res.sendFile(path.join(FRONTEND_DIR, "index.html")));
app.use((req, res) => res.status(404).sendFile(path.join(FRONTEND_DIR, "404.html")));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`EngiLearn tunnel server running on http://localhost:${PORT}`);
    console.log(`API proxy target: http://${BACKEND_HOST}:${BACKEND_PORT}`);
});
