const express = require("express");
const app = express();
const connectDB = require("./db/connectDB").default;
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const nocache = require("nocache");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");


dotenv.config();


const port = 5000 ;


// Use CORS Middleware
app.use(
  cors({
    origin: "https://react-nodejs-jwt-auth.vercel.app", // Allow requests from your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(nocache());


// static assets
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
