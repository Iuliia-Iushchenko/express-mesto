const express = require('express');
const {
  getAllUsers, getUser, createUser, updateUser, uppdateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', uppdateAvatar);

module.exports = router;
