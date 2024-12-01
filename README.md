
#  Soul Snippets

🌟 Soul Snippets

Soul Snippets is a web application designed to share inspirational quotes daily while offering a seamless user experience. It includes a robust authentication system and password recovery features. Built with a modern tech stack, it emphasizes secure, efficient, and validated data handling.

## Key Features

✨ User Authentication:
Powered by JWT (JSON Web Tokens), the app ensures secure login and session management for users.

✉️ Email Functionality:
With Nodemailer, the app sends email verification links, password reset emails, and daily inspirational quotes to subscribed users.

✅ Input Validation:
Incorporates Zod to validate user inputs, ensuring data integrity and security at every step.

💡 Personalized Experiences:
Users can customize their preferences for receiving daily quotes, tailored to their interests.
## Teck Stack
Frontend: React with Vite 🚀

Backend: Node.js and Express 🛠️

Database: MongoDB 🍃

Authentication: JWT for secure token-based authentication 🔐

Validation: Zod for schema-based input validation ✅

Email Services: Nodemailer for sending emails effortlessly 📧

Scheduling: Node-Cron for automating daily tasks like quote delivery 
## Run Locally 🖥️

Clone the project

```bash
  git clone https://github.com/shivshankargit/Soul-Snippets.git
```

Go to the project directory

```bash
  cd Soul-Snippets
```

Install dependencies

```bash
  npm run build
```

Start the server

```bash
  npm start
```


##  Set up Environment Variables

Cretae .env file in root, where json packages are available

```bash
MONGO_URI = your-MONGO_URI
PORT = 3000
EMAIL_USER = your email 
EMAIL_PASS = email password
JWT_SECRET_AUTH = jwt secret key
NODE_ENV = development
CLIENT_URL = your client url
VITE_SERVER_URL=your server url

```
🔔 Note: If you encounter issues with email services, search for solutions online or refer to email service documentation for setup tips.
## 🌐 Demo

https://soul-snippets.onrender.com

