const express = require('express');
const router = express.Router();
const controller = require('../controllers/game-controller');

router.get('/', controller.getAll);
router.get('/search', controller.search);
router.get('/:id', controller.getById);
router.post('/calculate', controller.calculate);

module.exports = router;