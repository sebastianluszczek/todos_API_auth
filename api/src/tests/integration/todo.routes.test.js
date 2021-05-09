/*global beforeAll, afterEach, afterAll, describe, it, expect*/

const request = require('supertest');
const jwt = require('jsonwebtoken');

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

let token;
let decoded;
beforeAll(done => {
  request('http://localhost:4000')
    .post('/auth/login')
    .send({
      email: 'test@mail.com',
      password: 'pass123',
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      decoded = jwt.decode(token); // save decoded token

      todo1.user = decoded._id;
      todo2.user = decoded._id;
      done();
    });
});

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('Todo routes tests', () => {
  describe('POST /api/todos', () => {
    it('should create new todo', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({
          title: 'Test todo',
          description: 'descriptions',
        })
        .set({ Authentication: `Bearer ${token}` });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('todo');
    });
    it('should return 401 (unauthorized) with wrong JWT', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({
          title: 'Test todo',
          description: 'descriptions',
        })
        .set({ Authentication: `Bearer ${'wrong_JWT'}` });

      expect(res.statusCode).toEqual(401);
    });
    it('should return 401 (unauthorized) without JWT', async () => {
      const res = await request(app).post('/api/todos').send({
        title: 'Test todo',
        description: 'descriptions',
      });

      expect(res.statusCode).toEqual(401);
    });
    it('should not allow create todo with incomplete body', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({
          description: 'descriptions',
        })
        .set({ Authentication: `Bearer ${token}` });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /api/todos', () => {
    it('should return todos list', async () => {
      await Todo.create([todo1, todo2]);
      const res = await request(app)
        .get('/api/todos')
        .set({ Authentication: `Bearer ${token}` });

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.todos)).toBe(true);
      expect(res.body.todos.length).toBe(2);
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should return todo if exist', async () => {
      const doc = await Todo.create(todo1);
      const res = await request(app)
        .get(`/api/todos/${doc._id}`)
        .set({ Authentication: `Bearer ${token}` });

      expect(res.statusCode).toEqual(200);
      expect(res.body.todo._id).toBe(doc.id);
    });
    it('should return error (404) if todo not exist', async () => {
      const res = await request(app)
        .get(`/api/todos/60950d9dea7edc006d7fc612`)
        .set({ Authentication: `Bearer ${token}` });
      expect(res.statusCode).toEqual(404);
    });
    it('should return error (400) if ID not valid ID', async () => {
      const res = await request(app)
        .get(`/api/todos/not_ID`)
        .set({ Authentication: `Bearer ${token}` });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should remove todo', async () => {
      const doc = await Todo.create(todo1);
      const res = await request(app)
        .delete(`/api/todos/${doc._id}`)
        .set({ Authentication: `Bearer ${token}` });
      expect(res.statusCode).toEqual(204);
    });
  });

  describe('PATCH /api/todos/:id', () => {
    it('should update todo', async () => {
      const doc = await Todo.create(todo1);
      const res = await request(app)
        .patch(`/api/todos/${doc._id}`)
        .set({ Authentication: `Bearer ${token}` })
        .send({ title: 'Updated Test Todo #1' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.todo.title).toBe('Updated Test Todo #1');
    });
  });
});
