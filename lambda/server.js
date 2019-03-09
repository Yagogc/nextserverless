const express = require("express");
const serverless = require("serverless-http");
const fs = require("fs");
const { parse } = require("path");

const app = express();

fs.readdirSync("./.next/serverless/pages").forEach(file => {
  if (file.charAt(0) === "_") return;

  const pageName = parse(file).name;

  app.get(`/${pageName}`, (req, res) => {
    let page = require(`../.next/serverless/pages/${pageName}.js`);
    page.render(req, res);
  });
});

module.exports.handler = serverless(app);
