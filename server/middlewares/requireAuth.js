import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
    const authTokenCookie = req.cookies.token;

    if(!authTokenCookie) {
        return res.status(401).json({error: "Authorization Token Required"});
    }

    try {
        const decoded = jwt.verify(authTokenCookie, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }

    catch(error) {
        console.error(error)
        res.status(401).json({error: "Token is invalid or expired"});
    }
}