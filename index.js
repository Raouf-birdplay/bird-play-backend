require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 5080;
const { connection } = require("./configs/db");
const http = require("http");
const server = http.createServer(app);

app.use(helmet());
app.use(express.text());
app.use(cors({ origin: "*" }));
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

const { adminAuthRouter } = require("./routes/auth/adminAuth");
const { adminRouter } = require("./routes/users/admin");
const { contactRouter } = require("./routes/general/contact");
const { postRouter } = require("./routes/post/post");

app.use(express.json());
app.use("/auth", adminAuthRouter);
app.use("/admin", adminRouter);
app.use("/contact", contactRouter);
app.use("/post", postRouter);

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
});
