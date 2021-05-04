const router = require('express').Router();

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  removeOne,
} = require('../controllers/todo.controllers');

router.get('/', getAll);

router.get('/:id', getOne);

router.post('/', createOne);

router.patch('/:id', updateOne);

router.delete('/:id', removeOne);

module.exports = router;
