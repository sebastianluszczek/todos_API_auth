const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');

const Todo = require('../../models/todo.model');

const todo1 = {
  title: 'Test ToDo #1',
  description: 'Description of test',
};
const todo2 = {
  title: 'Test ToDo #2',
  description: 'Description of test',
};

const { connect, clearDatabase, closeDatabase } = require('../setup');

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('Todo routes tests', () => {
  describe('POST /api/todos', () => {
    it('should create new todo', async () => {
      const res = await request(app).post('/api/todos').send({
        title: 'Test todo',
        description: 'descriptions',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('todo');
    });
  });

  describe('GET /api/todos', () => {
    it('should return todos list', async () => {
      // Fill collection with two todos
      await Todo.create([todo1, todo2]);
      const res = await request(app).get('/api/todos');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.todos)).toBe(true);
      expect(res.body.todos.length).toBe(2);
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should return one todo', async () => {
      const doc = await Todo.create(todo1);
      const res = await request(app).get(`/api/todos/${doc._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.todo._id).toBe(doc.id);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should remove todo', async () => {
      const doc = await Todo.create(todo1);
      const res = await request(app).delete(`/api/todos/${doc._id}`);
      expect(res.statusCode).toEqual(204);
    });
  });

  describe('PATCH /api/todos/:id', () => {
    it('should update todo', async () => {
      const doc = await Todo.create(todo1);
      const res = await request(app)
        .patch(`/api/todos/${doc._id}`)
        .send({ title: 'Updated Test Todo #1' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.todo.title).toBe('Updated Test Todo #1');
    });
  });
});
