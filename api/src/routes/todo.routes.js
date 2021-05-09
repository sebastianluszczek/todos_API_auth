const router = require('express').Router();

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  removeOne,
} = require('../controllers/todo.controllers');
/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Todo ID.
 *           example: 60983cce6030e7009b386b1f
 *         title:
 *           type: string
 *           description: Todo's title.
 *           example: Test todo
 *         description:
 *           type: string
 *           description: Todo's description.
 *           example: Test todo descrption
 *         user:
 *           type: string
 *           description: Todos's creator ID.
 *           example: 609839cdaf5c1572ae424767
 *         created_at:
 *           type: string
 *           description: Todos's created_at time.
 *           example: 2021-05-09T19:49:34.273Z
 *         completed:
 *           type: bool
 *           description: Todos's completion status.
 *           example: false
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve a list user todos
 *     description: Retrieve a list of all todos created by logged user. Information what user is are get from JWT
 *     responses:
 *       200:
 *         description: A list of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized user or missing JWT
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Retrieve single todo by ID
 *     description: Retrieve todo created by logged user. Information what user is are get from JWT
 *     responses:
 *       200:
 *         description: Single todo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todo:
 *                   type: object
 *                   $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized user or missing JWT
 *       404:
 *         description: Todo with specific ID does not exist
 */
router.get('/:id', getOne);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create todo.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todo:
 *                   type: object
 *                   $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized user or missing JWT
 */
router.post('/', createOne);

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Update todo.
 *     responses:
 *       200:
 *         description: Todo updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todo:
 *                   type: object
 *                   $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Unauthorized user or missing JWT
 *       404:
 *         description: Todo with specific ID does not exist
 */
router.patch('/:id', updateOne);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete todo.
 *     responses:
 *       204:
 *         description: Todo deleted
 *       401:
 *         description: Unauthorized user or missing JWT
 *       404:
 *         description: Todo with specific ID does not exist
 */
router.delete('/:id', removeOne);

module.exports = router;
