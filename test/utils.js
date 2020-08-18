const mongoose = require('mongoose');

const setup = async () => {
  await mongoose.connect(``,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connected on")
};

module.exports = {setup};