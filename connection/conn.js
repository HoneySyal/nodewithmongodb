const mongoose = require('mongoose');

module.exports = {
  connect: (cb) => {
    const url = process.env.DATABASE_URL;
    mongoose.set('strictQuery', true);
    mongoose
      .connect(url)
      .then(result => {
        console.log('Db connected...');
      })
      .catch(err => {
        console.log(err);
      })

  }
};