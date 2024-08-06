import auth from "../config/firebase-config.js";

export const verifyToken = async (req, res, next) => {
  console.log("Verify Token Inside");
  console.log(req);

  const token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers.authorization);
  console.log(token);

  if (!token) return res.status(401).json({ message: "Empty Token" });
  try {
    const decodeValue = await auth.verifyIdToken(
      "MlSnewtGA7WPjme1pLKtf6zW6AM2"
    );
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    console.error("Error verifying token: ", e);
    return res.status(500).json({ message: "Internal Error" });
  }
};
