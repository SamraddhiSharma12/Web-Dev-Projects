import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Get token from the header (usually "token" or "Authorization")
    const authHeader = req.headers.token;

    if (authHeader) {
        // Split if you use "Bearer <token>" format, or just take the string
        const token = authHeader.split(" ")[1]; 

        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return res.status(403).json("Token is not valid!");
            
            // If valid, save user info (id) to the request object
            req.user = user;
            next(); // Move to the actual route logic
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};