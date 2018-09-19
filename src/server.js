const myfunc = require('./myfunc');
const app = require('./app')

app.listen(app.get('port'), () => {
  myfunc.log(`Express server is listening on port ${app.get('port')}`);
});