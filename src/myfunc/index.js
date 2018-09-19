module.exports = {

  log: function(title, stuff) {
    if (process.env.NODE_ENV === 'development') {
      (stuff) ? 
        console.log('\n' + title + '\n', stuff)
        :
        console.log('\n' + title + '\n');
    } 
  }

}