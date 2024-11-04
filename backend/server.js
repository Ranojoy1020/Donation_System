const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


//* Routes
const userRoutes = require('./routes/userRoutes')
const ngoRoutes = require('./routes/ngoRoutes')
const adminRoutes = require('./routes/adminRoutes')
const donationRoutes = require('./routes/donationRoutes');


const app = express();

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({extended: true}));


app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/donations', donationRoutes);

app.use('/api/userImages', express.static('./public/userImages'))
app.use('/api/ngoImages', express.static('./public/ngoImages'))
app.use('/api/donations', express.static('./public/donations'))

//* Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/donation_sys")
.then(() => { console.log("Connected to MongoDB"); })
.catch((err) => { console.log(err); });


app.listen(process.env.PORT, () => {console.log("Listening on Port: " + process.env.PORT);
})