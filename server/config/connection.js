const mongoose = require('mongoose');
require('dotenv').config('./.env')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dungeon-notes-dragons-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
