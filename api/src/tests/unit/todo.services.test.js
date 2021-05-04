const mongoose = require('mongoose');

const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  removeTodoById,
} = require('../../services/todo.services');

const data = {
  title: 'Test ToDo',
  description: 'Description of test',
};

describe('Todo services Test', () => {
  // Connect to the MongoDB Memory Server
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  it('create todo successfully', async () => {
    const doc = await createTodo(data);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(doc._id).toBeDefined();
    expect(doc.title).toBe(data.title);
    expect(doc.description).toBe(data.description);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
