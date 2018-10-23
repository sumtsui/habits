const { log } = require('./src/myfunc');
const app = require('./src/app');

app.listen(app.get('port'), (err) => {
  if (err) log(err.message);
  else log(`Express server is listening on port ${app.get('port')}`);
});