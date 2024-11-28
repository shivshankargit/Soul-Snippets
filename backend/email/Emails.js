const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationMail = async (user) => {
    const transporter = await createMailTransporter();

    const mailOptions = {
        from: '"Soul Snippets" <shivshankar.araligida@gmail.com>',
        to: user.email,
        subject: "Verify your email...",
        html: `<p>Hello 👋 ${user.username}, verify your email by using this otp ${user.verificationToken} </p>`,
        category: "Email Verification"    
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Verification email sent");
        }
    });
};

const sendPasswordResetMail = async (user, resetToken) => {
    const transporter = await createMailTransporter();
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
        from: '"Soul Snippets" <shivshankar.araligida@gmail.com>', 
        to: user.email,
        subject: "Reset your password",
        text: `Hello 👋 ${user.username},\n\nYou requested a password reset. Click the link 
        below to reset your password:\n\n${resetLink}\n\nIf you did not request this,
        please ignore this email.`,
        html: `<p>Hello 👋 ${user.username} ,</p><p>You requested a password reset. Click the 
        link below to reset your password:</p><a href="${resetLink}">Reset Password</a><p>
        If you did not request this, please ignore this email.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Reset Email sent successfully,");
    } catch (error) {
        console.error("Error sending reset email:", error);
        throw new Error("Could not send reset email,");
    }
};

const sendResetSuccessMail = async (user) => {
    const transporter = await createMailTransporter();

    const mailOptions = {
        from: '"Soul Snippets" <shivshankar.araligida@gmail.com>', 
        to: user.email,
        subject: "Password reset Successful",
        text: `Hello 👋 ${user.username},\n\nYour password has been 
        successfully reset. If you did not initiate this change,
        please contact support immediately.\n\nThank you!`,
        html: `<p>Hello 👋 ${user.username},</p><p>Your password has been successfully 
        reset. If you did not initiate this change, 
        please contact support immediately.</p><p>Thank you!</p>`
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log("Password reset success email sent successfully.");
    } catch (error) {
        console.error("Error sending password reset success email:", error);
        throw new Error("Could not send password reset success email.");
    }
}

module.exports = { 
    sendVerificationMail,
    sendPasswordResetMail,
    sendResetSuccessMail
};