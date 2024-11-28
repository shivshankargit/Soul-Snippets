const axios = require ("axios");
const cron = require('node-cron');
const { createMailTransporter } = require("./createMailTransporter");
const User = require("../models/user.model");

const fetchQuote = async () => {
    try{
        const response = await axios.get("https://stoic-quotes.com/api/quote");
        const { text, author } = response.data;
        return { text, author};
    } catch (error) {
        console.error("Error fetching quote:", error);
        return "Keep pushing forward!"; 
    }
};

const sendQuoteEmail = async (user) => {
    const transporter = await createMailTransporter();
    const quote = await fetchQuote();

    const mailOptions = {
        from: `"Soul Snippets" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Your Daily Stoic Quote",
        html: `<p>Hello 👋 ${user.username},</p>
        <p>Here's your quote for the day:</p>
        <blockquote style="font-style: italic; color: #555;">
            "${quote.text}" — <strong>${quote.author || "Unknown"}</strong>
        </blockquote>
        <p>We hope this inspires you today! ✨</p>
        <hr>
        <p>If you enjoy these quotes, stay tuned for more every day!</p>
        <p>Best wishes,<br>Soul Snippets Team</p>
            `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Quote email sent to ${user.email}`);
    } catch (error) {
        console.error(`Error sending email to ${user.email}:`, error);
    }
};

    const sendDailyQuote = async () => {
    try {
        const users = await User.find({ isVerified: true, wantsQuotes: true });
        for (const user of users) {
            await sendQuoteEmail(user);
        }
        console.log("Daily quotes sent to all users");
    } catch (error) {
        console.error("Error sending daily quotes:", error);
    }
};

module.exports = {
    fetchQuote,
    sendQuoteEmail,
    sendDailyQuote
}
