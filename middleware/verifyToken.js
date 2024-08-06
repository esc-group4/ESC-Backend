import auth from "../config/firebase-config.js";

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Empty Token" });
    try {
        const decodeValue = await auth.verifyIdToken(token);
        if (decodeValue) {
            req.user = decodeValue;
            return next();
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        return res.status(500).json({ message: "Internal Error" });
    }
};