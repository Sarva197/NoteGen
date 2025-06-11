import jwt from "jsonwebtoken";
import httpStatus from "http-status";

const authenticateUser = (req, res, next) => {// Middleware to authenticate user using JWT from cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decoded.id; // user id attached here
    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
