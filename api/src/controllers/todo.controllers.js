const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  removeTodoById,
} = require('../services/todo.services');

const { ErrorHandler } = require('../utils/error.utils');
const {
  createTodValidator,
  updateTodoValidator,
} = require('../utils/validation.utils');

module.exports.getAll = async (req, res, next) => {
  try {
    const todos = await getAllTodos(req.user._id);
    res.json({
      todos: todos,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.createOne = async (req, res, next) => {
  try {
    // Validate request
    const { error } = createTodValidator(req.body);
    if (error) throw new ErrorHandler(400, error.details[0].message);

    const data = {
      ...req.body,
      user: req.user._id,
    };

    const doc = await createTodo(data);
    res.status(201).json({ todo: doc });
  } catch (error) {
    next(error);
  }
};

module.exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const todo = await getTodoById(id, req.user._id);
    if (!todo) {
      throw new ErrorHandler(404, [`Todo ${id} not found`]);
    }
    res.json({ todo: todo });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const todo = await getTodoById(id, req.user._id);
    if (!todo) throw new ErrorHandler(404, [`Todo ${id} not found`]);

    // Validate request
    const { error } = updateTodoValidator(req.body);
    if (error) throw new ErrorHandler(400, error.details[0].message);

    const doc = await updateTodoById(id, req.body);
    res.json({ todo: doc });
  } catch (error) {
    next(error);
  }
};

module.exports.removeOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const todo = await getTodoById(id, req.user._id);
    if (!todo) throw new ErrorHandler(404, [`Todo ${id} not found`]);

    await removeTodoById(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
