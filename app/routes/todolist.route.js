const express = require('express');
const todolistController = require('../controllers/todolist.controller');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:user', todolistController.findAll);
  router.get('/detail/:id', todolistController.show);
  router.post('/', todolistController.create);
  router.put('/:id', todolistController.update);
  router.delete('/:id', todolistController.delete);

  app.use('/todolist', router);
};
