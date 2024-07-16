require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const subgredditRoutes = require("./routes/subgreddit");
const savedpostRoutes = require("./routes/savedpost") 
const reportedpostRoutes = require("./routes/reportedpost")
const dashboardRoutes = require("./routes/dashboard")
// const postRoutes = require("./routes/post");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes 
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/subgreddit", subgredditRoutes);
app.use("/api/savedpost", savedpostRoutes)
app.use("/api/reportedpost", reportedpostRoutes)
app.use("/api/dashboard", dashboardRoutes)
// app.use("/api/posts", postRoutes);

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Listening on port ${port}...`));
