const express = require('express');
const { log } = require('./src/myfunc');
const app = require('./src/app');

//Behaviour for production env.
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  //like our main.js file, or main.css file
  app.use(express.static("client/build"));
  //Express will serve index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(app.get('port'), (err) => {
  if (err) log(err.message);
  else log(`Express server is listening on port ${app.get('port')}`);
});