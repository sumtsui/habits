const express = require('express');
const { log } = require('./src/myfunc');
const app = require('./src/app');

const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(app.get('port'), (err) => {
  if (err) log(err.message);
  else log(`Express server is listening on port ${app.get('port')}`);
});