require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = require("./src/app");

const connectDB = require("./src/config/database");

const startServer = async () => {
  try {
    await connectDB();

    await app.listen({
      port: process.env.PORT,
      host: "0.0.0.0"
    });

    console.log(`Server running on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

startServer();