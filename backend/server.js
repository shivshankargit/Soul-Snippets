const express = require ("express");
const dotenv = require ("dotenv");
const cors = require ("cors");
const cookieParser = require ("cookie-parser");
const cron = require("node-cron");
const { sendDailyQuote } = require("./email/sendRandomQuote");
const connectDb = require("./db/db");
const path = require ("path");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

const userRouter = require ("./routes/user.route");
app.use("/api/user", userRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
	});
}

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
})

cron.schedule("18 19 * * *", async () => {
    console.log("Running daily quote cron job...");
    try {
        await sendDailyQuote();
        console.log("Daily quotes sent successfully.");
    } catch (error) {
        console.error("Error in daily quote cron job:", error);
    }
});

