const mongoose = require("mongoose");

let todoSchema = mongoose.Schema({
  text: { type: String, required: true },
  complete: { type: Boolean, default: false },
  timestamp: { type: String, default: Date.now() },
});

let Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
