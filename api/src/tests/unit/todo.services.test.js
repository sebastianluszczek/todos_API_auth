const mongoose = require('mongoose');

const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  removeTodoById,
} = require('../../services/todo.services');

const { connect, clearDatabase, closeDatabase } = require('../setup');

const Todo = require('../../models/todo.model');

const todo1 = {
  title: 'Test ToDo #1',
  description: 'Description of test',
};
const todo2 = {
  title: 'Test ToDo #2',
  description: 'Description of test',
};

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('Todo services Test', () => {
  // Connect to the MongoDB Memory Server
  // beforeAll(async () => {
  //   await mongoose.connect(global.__MONGO_URI__, {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useUnifiedTopology: true,
  //   });
  // });

  // afterEach(async () => {
  //   // Clear collection after each test
  //   await Todo.deleteMany();
  // });

  it('should create todo', async () => {
    const doc = await createTodo(todo1);
    // Object Id should be defined when successfully saved to MongoDB.
    expect(doc._id).toBeDefined();
    expect(doc.title).toBe(todo1.title);
    expect(doc.description).toBe(todo1.description);
  });

  it('should retrieve list of todos', async () => {
    // Fill collection with two todos
    const doc = await Todo.create([todo1, todo2]);

    const response = await getAllTodos();

    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBe(2);
  });

  it('should retrieve single todo by ID', async () => {
    // Fill collection with todo
    const doc = await Todo.create(todo1);

    const response = await getTodoById(doc._id);

    expect(response).toBeDefined();
    expect(response._id).toBeDefined();
    expect(response._id).toStrictEqual(doc._id);
    expect(response.title).toBe(todo1.title);
  });

  it('should remove single todo by ID', async () => {
    // Fill collection with todo
    const doc = await Todo.create(todo1);
    // Remove filled element
    const response = await removeTodoById(doc._id);
    // Check Todos collection
    const todos = await Todo.find();

    expect(response).toBeDefined();
    expect(response._id).toStrictEqual(doc._id);
    expect(Array.isArray(todos)).toBe(true);
    expect(todos.length).toBe(0);
  });

  it('should update single todo by ID', async () => {
    // Fill collection with todo
    const doc = await Todo.create({
      title: 'Test ToDo #1',
      description: 'Description of test',
    });
    // Remove filled element
    const response = await updateTodoById(doc._id, {
      title: 'Test ToDo #1 updated',
      description: 'Description of test updated',
    });

    expect(response).toBeDefined();
    expect(response._id).toStrictEqual(doc._id);
    expect(response.title).toBe('Test ToDo #1 updated');
    expect(response.description).toBe('Description of test updated');
  });

  it('should update single todo by ID - with partial body', async () => {
    // Fill collection with todo
    const doc = await Todo.create({
      title: 'Test ToDo #1',
      description: 'Description of test',
    });
    // Remove filled element
    const response = await updateTodoById(doc._id, {
      description: 'Description of test updated',
    });

    expect(response).toBeDefined();
    expect(response._id).toStrictEqual(doc._id);
    expect(response.title).toBe('Test ToDo #1');
    expect(response.description).toBe('Description of test updated');
  });

  // afterAll(async () => {
  //   await mongoose.connection.close();
  //   done();
  // });
});
