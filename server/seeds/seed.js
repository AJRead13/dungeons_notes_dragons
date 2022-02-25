const db = require('../config/connection');
const { Tech } = require('../models');

const techData = require('./techData.json');

db.once('open', async () => {
  await Tech.deleteMany({});

  const technologies = await Tech.insertMany(techData);

  console.log('Users and Characters Seeded!');
  process.exit(0);
});
