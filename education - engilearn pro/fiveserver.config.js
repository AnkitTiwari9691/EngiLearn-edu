module.exports = {
    host: "0.0.0.0",
    port: 5500,
    open: false,
    proxy: {
        "/api": "http://127.0.0.1:5021"
    }
};
