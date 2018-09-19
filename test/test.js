const bcrypt = require('bcrypt');
const password = '123';
let hashed;
describe('Bcrypt', () => {
  it('should hash a password', () => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) console.log(err);
      hashed = hash;
      expect(hash).not.toBe(undefined);
      expect(hash).toHaveLength(60);
    })
  })

  it('should know the right password', () => {
    let isMatch = false;
    bcrypt.compare('password', hashed, function (err, result) {
      if (err) return console.log(err);
      if (result === true) {
        isMatch = true;
      } else {
        isMatch = false;
      }
      console.log('isMatch', isMatch);
      expect(isMatch).toBe(true);
    })
  })

  
})