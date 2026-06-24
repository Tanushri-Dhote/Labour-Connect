const jwt = require("jsonwebtoken");

const adminAuth = async (
  request,
  reply
) => {
  try {
    const authHeader =
      request.headers.authorization;

    if (!authHeader) {
      return reply.code(401).send({
        success: false,
        message: "Token required",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return reply.code(403).send({
        success: false,
        message: "Unauthorized access",
      });
    }

    request.admin = decoded;
  } catch (error) {
    return reply.code(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = adminAuth;