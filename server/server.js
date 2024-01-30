let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let PORT = process.env.PORT || 8011;

let app = express();

// Connecting to database

mongoose
  .connect(
    // "mongodb+srv://ankitTodo:nokiaankit@keepapp.k64m2ay.mongodb.net/todos?retryWrites=true&w=majority"
    "mongodb://127.0.0.1:27017/k"
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database not connected");
  });

// middleware
app.use(express.json());
app.use(cors());

let Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  let todos = await Todo.find();
  res.json(todos);
});
app.post("/todo/new", async (req, res) => {
  let { text } = req.body;
  //   console.log(text);
  let newTodo = await Todo.create({ text });
  //   let newTodo = new Todo(text);
  //   await newTodo.save();
  res.json(newTodo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  //   const result = await Todo.findByIdAndDelete(req.params.id);
  // const result1 = await Todo.deleteOne({ _id: req.params.id }); // This will return { acknowledged: true, deletedCount: 1 } So This will not work properly
  const result = await Todo.findByIdAndDelete({ _id: req.params.id }); // This will return { _id: "64aabbbd6b10002ae445788a", text: "hello realme", complete: false, timestamp: "1688910746855", __v: 0 } This will work properly
  res.json(result);
});
app.put("/todo/complete/:id", async (req, res) => {
  let todo = await Todo.findOne({ _id: req.params.id });
  todo.complete = !todo.complete;
  await todo.save();
  res.json(todo);
});
app.listen(PORT, () => {
  console.log("server is listing on port no ", PORT);
});
