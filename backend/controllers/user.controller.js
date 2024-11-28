const z = require ("zod");
const User = require("../models/user.model");
const bcryptjs = require ("bcryptjs");
const crypto = require ("crypto");
const { sendVerificationMail, sendPasswordResetMail, sendResetSuccessMail } = require("../email/Emails");
const generateTokenAndSetCookie = require("../utils/generateTokensAndSetCookies");
const { sendQuoteEmail } = require("../email/sendRandomQuote");

const signupBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(3)
})

const signinBody = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

const signup = async (req, res) => {
    const { success } = signupBody.safeParse(req.body);

    try {
        if(!success) {
            return res.status(411).json({
                success: false,
                message: "You've entered wrong inputs"
            });
        }

        const userExists = await User.findOne({email: req.body.email});

        if(userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); 

        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000

        })
        await user.save();

        generateTokenAndSetCookie(res, user._id);
        await sendVerificationMail(user);
        
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const signin = async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    try {
        if(!success) {
            return res.status(411).json({
                success: false,
                message: "You've entered wrong credentials"
            })
        }

        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.status(411).json({
                success: false, 
                message: "User doesn't exists!!"
            })
        }

        const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "You've entered wrong password"
            })
        }

        const today = new Date().toISOString().split("T")[0]; 
        const lastQuoteDate = user.lastQuoteSentAt
            ? user.lastQuoteSentAt.toISOString().split("T")[0]
            : null;

        if (lastQuoteDate !== today) {
            await sendQuoteEmail(user);

            user.lastQuoteSentAt = new Date();
        }

        generateTokenAndSetCookie(res, user._id);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Signin successfulled",
            user: {
                ...user._doc,
                password: undefined
            },
        });
    } catch (error) {
        console.log("Error in signin", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};  

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}

const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try{
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code"});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendQuoteEmail(user);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("error in verifyEmail", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(411).json({message: "User not found"});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();
        sendPasswordResetMail(user,resetToken);

        res.status(200).json({message: "Reset link is sent to your email"})

    } catch (error) {
        console.log("Error in forget password", error);
        res.status(500).json({message: error.message});
    }
}

const resetPassword = async (req, res) => {
    const { token} = req.params; 
    const {password} = req.body;

    try{
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if(!user) {
            return res.status(411).json({message: "Invalid or expired token "});
        }
        
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        sendResetSuccessMail(user);

        res.status(200).json({success: true, message: "password reset successfully"})

    } catch (error) {
        console.log("Error in resetPassword", error);
        res.status(500).json({message: error.message});
    }
}

const checkAuth = async (req, res) => {
    try{
        const user = await User.findById(req.userId).select("-password");
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const preferences = async (req, res) => {
    const { wantsQuotes } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { wantsQuotes },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: 'Preferences updated successfully.', user });
    } catch (error) {
        console.error("Error updating preferences:", error);
        res.status(500).json({ message: 'Error updating preferences. Please try again later.' });
    }
}

module.exports = {
    signup,
    signin,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth,
    preferences
}