const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(411).json({
            success: false,
            message: "Unauthorized - no token provided"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_AUTH);
        if(!decoded) {
            return res.status(411).json({
                success: false,
                message: "Unauthorized - no token provided"
            })
        }
        req.userId = decoded.userId;
        next();
        
    } catch (error) {
        console.log("Error in verifyToken", error);
        res.status(500).json({message: "Server Error"});
    }
}

module.exports = verifyToken;