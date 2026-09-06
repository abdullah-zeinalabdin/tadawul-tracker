import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
    const authTokenBearer = req.headers.authorization;

    if(!authTokenBearer) {
        return res.status(401).json({error: "Authorization Token Required"});
    }

    const authToken = authTokenBearer.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }

    catch(error) {
        res.status(401).json({error: "Token is invalid or expired"});
    }
}