const {Router} = require('express');

// * Import Middleware
const { handleFile } = require('../middleware/fileHandler')
const { verifyToken } = require('../middleware/auth')

// * Importing Controllers
const {register, login, updatePasswd, forgotPasswd, resetPasswd, updateProfile, submitQuery, userQuery, savePreference} = require('../Controllers/userController');
const { makeDonation, user_donationHistory } = require('../Controllers/donationController.js');

const router = Router()

// TODO Profile --> view, update, delete. Logout

// * User Routes
router
.post('/register',handleFile('../public/userImages/', 'file') , register)
.post('/login', login)
.post('/update_passwd', verifyToken, updatePasswd)
.post('/save_pref', verifyToken, savePreference)
.put('/update_profile', updateProfile)
.post('/submitQuery', submitQuery)
.get('/userQuery/:id', userQuery)
.post('/forgot_passwd', forgotPasswd)
.post('/reset_passwd', resetPasswd)
.post('/makeDonation', verifyToken, handleFile('../public/donations/', 'file'), makeDonation)
.get('/user_donation_history/:user_id', verifyToken, user_donationHistory)

module.exports = router