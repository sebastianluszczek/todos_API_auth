const mongoose = require('mongoose');
const Todo = require('../models/todo.model');

const { ErrorHandler } = require('../utils/error.utils');

module.exports.getAllTodos = async user_id => {
  const todos = await Todo.find({ user: mongoose.Types.ObjectId(user_id) });
  return todos;
};
module.exports.createTodo = async data => {
  const doc = await Todo.create(data);
  return doc;
};
module.exports.getTodoById = async (id, user_id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler(400, `'${id}' is not valid ID type`);
  }
  const doc = await Todo.findOne({ _id: id, user: user_id });
  return doc;
};
module.exports.updateTodoById = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler(400, `'${id}' is not valid ID type`);
  }
  const doc = await Todo.findByIdAndUpdate(
    { _id: id },
    { ...data },
    { new: true }
  );
  return doc;
};
module.exports.removeTodoById = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler(400, `'${id}' is not valid ID type`);
  }
  const doc = await Todo.findOneAndDelete({ _id: id });
  return doc;
};
