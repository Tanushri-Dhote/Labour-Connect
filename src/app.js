const Fastify = require("fastify");
const authRoutes = require("./modules/auth/auth.routes");

const app = Fastify({
  logger: true
});

app.get("/", async () => {
  return {
    success: true,
    message: "LabourConnect API Running"
  };
});
app.register(authRoutes, {
  prefix: "/api/auth",
});

module.exports = app;