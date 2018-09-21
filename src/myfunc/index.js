module.exports = {

  log: function(label, stuff) {
    if (process.env.NODE_ENV === 'development') {
      (stuff) ? 
        console.log('\n' + label + '\n', stuff)
        :
        console.log('\n', label);
    } 
  },

  newError: function(code, msg) {
    const err = new Error(msg);
    err.status = code;
    return err;
  }

}