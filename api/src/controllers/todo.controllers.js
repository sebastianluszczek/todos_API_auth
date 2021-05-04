const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  removeTodoById,
} = require('../services/todo.services');

module.exports.getAll = async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
};

module.exports.createOne = async (req, res) => {
  try {
    const doc = await createTodo(req.body);
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getOne = async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateOne = async (req, res) => {
  try {
    const doc = await updateTodoById(req.params.id, req.body);
    res.json(doc);
  } catch (error) {
    console.log(error);
  }
};

module.exports.removeOne = async (req, res) => {
  try {
    await removeTodoById(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};
