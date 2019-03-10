const express = require("express");
const serverless = require("serverless-http");
const fs = require("fs");
const { parse } = require("path");

const app = express();

const PAGES_PATH = "./.next/serverless/pages/";

fs.readdirSync(PAGES_PATH).forEach(file => {
  if (file.charAt(0) === "_") return;

  const page = parse(file).name;

  app.get(`/${page}`, (req, res) => {
    require(`${PAGES_PATH}/${page}`).render(req, res);
  });
});

app.get(`/`, (req, res) => {
  require(`${PAGES_PATH}/index`).render(req, res);
});

module.exports.handler = serverless(app);
