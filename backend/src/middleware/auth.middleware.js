const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({
        success: false,
        message: "Token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);
    if (!user) {
      return reply.status(401).send({
        success: false,
        message: "User not found or inactive",
      });
    }

    request.user = decoded;
  } catch (error) {
    return reply.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authenticate;