const mongoose = require('mongoose');

function connection() {
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log("DB Connected"))
      .catch(err => console.log(err));
}

module.exports = connection;