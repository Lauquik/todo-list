const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  email: String,
  password: String,
  todos: [{ title: String, desc: String, date: String, comleted: Boolean }],
});

const model = mongoose.model("todoUsers", Schema);

async function pushToDb(user) {
  await model(user).save();
}

async function find(email) {
  const user = await model
    .find({ email: email })
    .then((u) => {
      if (u.length === 0) {
        return null;
      } else {
        return u;
      }
    })
    .catch((e) => {
      console.log(e);
      return null;
    });

  return user;
}

async function update(email, todos) {
  await model.updateOne({ email: email }, { todos: todos }).then(() => {
    console.log("update sucksexful");
  });
}

module.exports = {
  pushToDb,
  find,
  update,
};
