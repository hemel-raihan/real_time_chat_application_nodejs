const express = require('express')
const {getLogin, login, logout} = require('../controller/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { doLoginValidators, doLoginValidationHandler } = require('../middlewares/login/loginValidator');

const router = express.Router()

const page_title = "Login";
// login page
router.get('/', decorateHtmlResponse(page_title), getLogin);

router.post('/', decorateHtmlResponse(page_title), doLoginValidators, doLoginValidationHandler, login);

router.delete('/', logout);

module.exports = router;