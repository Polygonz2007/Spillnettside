const config = {
    port: 3000
};

/// Imports ///
const database = require("./src/database.js");
const account = require("./src/account.js");
//const page = require("./src/page.js");

///  SETUP  ///
// Express + routing
const express = require("express");
const session = require("express-session");
const path = require("path");

const session_parser = session({
    secret: 'crazy_secret!',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // If using HTTPS, set to true
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse urlencoded parameters
app.use(session_parser);

app.all("/games/*", account.check_login); // Make sure no gets or posts happen without being logged in

// Get
//app.get("/app/user/:userid", page.profile);

// Post
app.post("/login", account.login); // Allow users to log in, check if the credentials are correct and if they are update session
app.post("/create-account", account.create_account);

const public_path = path.join(__dirname, "public");

// HTTP
const http = require("http");
const server = http.createServer(app);

// Start server
app.use(express.static(public_path));
app.listen(config.port, () => {
    console.log("Server is running on http://127.0.0.1:" + config.port);
});