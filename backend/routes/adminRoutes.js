const {Router} = require('express');
const { login, getAllUser } = require('../Controllers/adminController');

const router = Router()

// * Admin Routes

router.get('/allUser', getAllUser)
.post('/login', login)


module.exports = router