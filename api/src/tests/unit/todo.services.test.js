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
  user: '609699121a57c8001d4e4418',
};
const todo2 = {
  title: 'Test ToDo #2',
  description: 'Description of test',
  user: '609699121a57c8001d4e4418',
};

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('Todo services test', () => {
  describe('createTodo service', () => {
    it('should create todo', async () => {
      const doc = await createTodo(todo1);
      expect(doc._id).toBeDefined();
      expect(doc.title).toBe(todo1.title);
      expect(doc.description).toBe(todo1.description);
    });
  });

  describe('getAllTodos service', () => {
    it('should retrieve empty list if no todos', async () => {
      const response = await getAllTodos('609699121a57c8001d4e4418');

      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBe(0);
    });
    it('should retrieve list of todos', async () => {
      const doc = await Todo.create([todo1, todo2]);
      const response = await getAllTodos('609699121a57c8001d4e4418');

      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBe(2);
    });
  });

  describe('getTodoById service', () => {
    it('should return single todo by ID', async () => {
      const doc = await Todo.create(todo1);
      const response = await getTodoById(doc._id, '609699121a57c8001d4e4418');

      expect(response).toBeDefined();
      expect(response._id).toBeDefined();
      expect(response._id).toStrictEqual(doc._id);
      expect(response.title).toBe(todo1.title);
    });
    it('should return null if todo with ID not exist', async () => {
      const response = await getTodoById(
        '60950d9dea7edc006d7fc612',
        '609699121a57c8001d4e4418'
      );

      expect(response).toBe(null);
    });
    it('should throw error if ID is not valid mongoDB ID', async () => {
      await expect(
        getTodoById('not_ID', '609699121a57c8001d4e4418')
      ).rejects.toThrow();
    });
  });

  describe('removeTodoById service', () => {
    it('should remove single todo by ID', async () => {
      const doc = await Todo.create(todo1);
      const response = await removeTodoById(doc._id);
      const todos = await Todo.find();

      expect(response).toBeDefined();
      expect(response._id).toStrictEqual(doc._id);
      expect(Array.isArray(todos)).toBe(true);
      expect(todos.length).toBe(0);
    });
    it('should return null if todo with ID not exist', async () => {
      const response = await removeTodoById('60950d9dea7edc006d7fc612');

      expect(response).toBe(null);
    });
    it('should throw error if ID is not valid mongoDB ID', async () => {
      await expect(getTodoById('not_ID')).rejects.toThrow();
    });
  });

  describe('updateTodoById service', () => {
    it('should update single todo by ID', async () => {
      const doc = await Todo.create({
        title: 'Test ToDo #1',
        description: 'Description of test',
        user: '609699121a57c8001d4e4418',
      });
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
      const doc = await Todo.create({
        title: 'Test ToDo #1',
        description: 'Description of test',
        user: '609699121a57c8001d4e4418',
      });
      const response = await updateTodoById(doc._id, {
        description: 'Description of test updated',
      });

      expect(response).toBeDefined();
      expect(response._id).toStrictEqual(doc._id);
      expect(response.title).toBe('Test ToDo #1');
      expect(response.description).toBe('Description of test updated');
    });
    it('should return null if todo with ID not exist', async () => {
      const response = await updateTodoById('60950d9dea7edc006d7fc612', {});

      expect(response).toBe(null);
    });
    it('should throw error if ID is not valid mongoDB ID', async () => {
      await expect(getTodoById('not_ID')).rejects.toThrow();
    });
  });
});
