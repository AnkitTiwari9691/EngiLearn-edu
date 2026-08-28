const nodemailer = require("nodemailer");

const provider = String(process.env.EMAIL_PROVIDER || "gmail").trim().toLowerCase();
const configuredService = String(process.env.EMAIL_SERVICE || "").trim();
const isGmail = provider === "gmail"
    || /gmail/i.test(configuredService)
    || /myaccount\.google\.com/i.test(configuredService);
const smtpPort = Number(process.env.SMTP_PORT || (isGmail ? 465 : 587));
const commonOptions = {
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    connectionTimeout: Number(process.env.EMAIL_CONNECTION_TIMEOUT_MS || 4000),
    greetingTimeout: Number(process.env.EMAIL_GREETING_TIMEOUT_MS || 4000),
    socketTimeout: Number(process.env.EMAIL_SOCKET_TIMEOUT_MS || 6000),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        minVersion: "TLSv1.2"
    }
};

let transportOptions;
if (process.env.SMTP_HOST) {
    transportOptions = {
        ...commonOptions,
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || smtpPort === 465
    };
} else if (isGmail) {
    transportOptions = {
        ...commonOptions,
        host: "smtp.gmail.com",
        port: smtpPort,
        secure: smtpPort === 465
    };
} else {
    transportOptions = {
        ...commonOptions,
        service: configuredService || provider
    };
}

const transporter = nodemailer.createTransport(transportOptions);

module.exports = transporter;
