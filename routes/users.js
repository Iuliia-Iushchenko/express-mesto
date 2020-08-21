const express = require('express');
const { getAllUsers, getUser } = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;
