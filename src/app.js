const Fastify = require("fastify");

const app = Fastify({
  logger: true
});

app.get("/", async () => {
  return {
    success: true,
    message: "LabourConnect API Running"
  };
});

module.exports = app;