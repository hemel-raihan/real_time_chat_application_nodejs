const express = require('express')
const {getUsers, addUser, removeUser} = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidator');

const router = express.Router()

// login page
router.get('/', decorateHtmlResponse("Users"), getUsers);

router.post('/', avatarUpload, addUserValidators, addUserValidationHandler, addUser);

router.delete('/:id', removeUser);

module.exports = router;