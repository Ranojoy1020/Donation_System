const {Router} = require('express');
const { login, getAllUser, getAllNgos, getUnverifiedNgos, deleteNgo, deleteUser, verifyNgo, getOpenQueries, answerQuery } = require('../Controllers/adminController');

const router = Router()

// * Admin Routes

router.get('/users', getAllUser)
.get('/ngos', getAllNgos)
.get('/unverified-ngos', getUnverifiedNgos)
.post('/login', login)
.put('/verify-ngo/:id', verifyNgo)
.delete('/delete-ngo/:id', deleteNgo)
.delete('/delete-user/:id', deleteUser)
.get('/openQueries', getOpenQueries)
.put('/answerQuery', answerQuery)


module.exports = router