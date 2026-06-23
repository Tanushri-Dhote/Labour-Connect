const Fastify = require("fastify");
const authRoutes = require("./modules/auth/auth.routes");
const labourRoutes = require("./modules/labour/labour.routes");
const categoryRoutes = require("./modules/category/category.routes");
const skillRoutes = require("./modules/skill/skill.routes");
const multipart = require("@fastify/multipart");
const path = require("path");
const fastifyStatic =
  require("@fastify/static");

  

const app = Fastify({
  logger: true
});

app.register(multipart);


app.get("/", async () => {
  return {
    success: true,
    message: "LabourConnect API Running"
  };
});
app.register(authRoutes, {
  prefix: "/api/auth",
});

app.register(labourRoutes, {
  prefix: "/api/labour",
});

app.register(categoryRoutes, {
  prefix: "/api/category",
});

app.register(skillRoutes, {
  prefix: "/api/skill",
});

app.register(fastifyStatic, {
  root: path.join(
    __dirname,
    "../uploads"
  ),
  prefix: "/uploads/",
});


module.exports = app;