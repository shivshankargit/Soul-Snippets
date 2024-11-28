const nodemailer = require ("nodemailer");

const createMailTransporter = async () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    return transporter;
};

module.exports = { createMailTransporter };