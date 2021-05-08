const mongoose = require('mongoose');
const Todo = require('../models/todo.model');

const { ErrorHandler } = require('../utils/error.utils');

module.exports.getAllTodos = async user_id => {
  try {
    const todos = await Todo.find({ user: user_id });
    return todos;
  } catch (error) {
    throw error;
  }
};
module.exports.createTodo = async data => {
  try {
    const doc = await Todo.create(data);
    return doc;
  } catch (error) {
    throw error;
  }
};
module.exports.getTodoById = async (id, user_id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorHandler(400, `'${id}' is not valid ID type`);
    }
    const doc = await Todo.findOne({ _id: id, user: user_id });
    return doc;
  } catch (error) {
    throw error;
  }
};
module.exports.updateTodoById = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorHandler(400, `'${id}' is not valid ID type`);
    }
    const doc = await Todo.findByIdAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
    return doc;
  } catch (error) {
    throw error;
  }
};
module.exports.removeTodoById = async id => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorHandler(400, `'${id}' is not valid ID type`);
    }
    const doc = await Todo.findOneAndDelete({ _id: id });
    return doc;
  } catch (error) {
    throw error;
  }
};
