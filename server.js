const express = require("express");
const helmet = require("helmet");

//Routes Here
const ProjectRouter = require("./projects/project-router.js");
const ResourceRouter = require("./resources/resources-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourceRouter);

module.exports = server;