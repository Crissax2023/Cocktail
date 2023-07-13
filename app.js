// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Cocktail";
hbs.registerPartials(__dirname + '/views/partials')
app.locals.appTitle = `${capitalize(projectName)} created by Karla and Cristian`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const postImageRoutes = require('./routes/image-post.routes');
app.use("/image-post", postImageRoutes);

const commentRoutes = require('./routes/comment.routes');
app.use("/comment", commentRoutes);

const userRoutes = require('./routes/auth.routes');
app.use('/auth', userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
