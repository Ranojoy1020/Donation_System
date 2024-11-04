const {Router} = require('express');
const { handleFile } = require('../middleware/fileHandler')
const { verifyToken } = require('../middleware/auth.js')

// * Importing Controllers
const { register, login } = require('../Controllers/ngoController') 
const { ngo_donationHistory, ngo_getPendingDonation, acceptRequest } = require('../Controllers/donationController.js') 

const router = Router()

// * NGO Routes
router
.post('/register', handleFile('../public/ngoImages', 'file') , register)
.post('/login', login)
.get('/ngo_donation_history/:ngo_id', verifyToken ,ngo_donationHistory)
.get('/ngo_getPendingDonation/', ngo_getPendingDonation)
.patch('/acceptRequest', acceptRequest)



module.exports = router