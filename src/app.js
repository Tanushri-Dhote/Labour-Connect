const Fastify = require("fastify");
const authRoutes = require("./modules/auth/auth.routes");
const labourRoutes = require("./modules/labour/labour.routes");
const categoryRoutes = require("./modules/category/category.routes");
const skillRoutes = require("./modules/skill/skill.routes");
const multipart = require("@fastify/multipart");
const path = require("path");
const fastifyStatic = require("@fastify/static");
const adminRoutes = require("./modules/admin/admin.routes");
const helmet = require("@fastify/helmet");
const cors = require("@fastify/cors");
const categoryClientRoutes = require("./modules/category/category.client-routes");
const employerRoutes = require("./modules/employer/employer.routes");

  

const app = Fastify({
  logger: true
});

app.register(helmet);
app.register(cors);
app.register(multipart);


app.get("/", async () => {
  return {
    success: true,
    message: "LabourConnect API Running"
  };
});
// labaour login
app.register(authRoutes, {
  prefix: "/api/auth",
});

// labaour profile
app.register(labourRoutes, {
  prefix: "/api/labour",
});

app.register(fastifyStatic, {
  root: path.join(
    __dirname,
    "../uploads"
  ),
  prefix: "/uploads/",
});

// Admin
app.register(adminRoutes, {
  prefix: "/api/admin",
});

app.register(categoryRoutes, {
  prefix: "/api/admin",
});

app.register(skillRoutes, {
  prefix: "/api/admin",
});

app.register(categoryClientRoutes, {
  prefix: "/api",
});

// employer
app.register(
  employerRoutes,
  {
    prefix:
      "/api/employer",
  }
);

module.exports = app;