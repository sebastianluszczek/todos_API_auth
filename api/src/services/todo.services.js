const Todo = require('../models/todo.model');

module.exports.getAllTodos = async () => {
  const todos = await Todo.find();
  return todos;
};
module.exports.createTodo = async data => {
  const doc = await Todo.create(data);
  return doc;
};
module.exports.getTodoById = async id => {
  const doc = await Todo.findById(id);
  return doc;
};
module.exports.updateTodoById = async (id, data) => {
  const doc = await Todo.updateOne({ _id: id }, { $set: { ...data } });
  return doc;
};
module.exports.removeTodoById = async id => {
  const doc = await Todo.remove({ _id: id });
  return doc;
};
