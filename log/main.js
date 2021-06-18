const mongoose = require("mongoose");
const logModel = require("./models/Log");

require("dotenv").config({ path: "./.env"});

const user = process.env.DB_USER; 
const pass = process.env.DB_PASS;
const db   = process.env.DB_DATABASE;

const str = `mongodb+srv://${user}:${pass}@cluster0.lsiaw.mongodb.net/${db}?w=majority`;

mongoose.connect(str, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected!"))
  .catch(e => console.log("Failed to connect!", e));

const log = async (error, from) => {
  let insertLog = new logModel({
    text: error,
    from: from
  });

  return new Promise((resolve, reject) => {
    insertLog
      .save()
      .then((res) => resolve({ text: `Insertion succesfull. Insertion ID: ${res._id}. Time: ${res.time}`, result: res }))
      .catch((err) => reject(`Insertion unsuccesfull. Something went wrong: ${err}`));
  });
}

module.exports = log;