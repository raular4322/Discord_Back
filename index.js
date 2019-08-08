const mongoose = require('mongoose');
const app = require('./app');

const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/discord_bot';
const port = process.env.PORT || 3000;


mongoose.connect(mongodb, {useNewUrlParser: true}, (err) => {
  if (err) console.log(`ERROR: connecting to Database. ${err}`);
  else {
    console.log(`Connection to ${mongodb} was succesfull`);
    app.listen(port, () => {
      console.log(`discord_bot RESTful API server started on: ${port}`);
    });
  }
});
