const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const ngoModel = require('../Models/ngoModel');

module.exports.register = async (req, res) => {
    let filename;
    try{
        if (req.file != undefined) filename = req.file.filename;
        const {
            reg_id,
            ngo_name, 
            ngo_email, 
            ngo_passwd, 
            ngo_addr,
            ngo_city,
            ngo_state,
            ngo_country,
            ngo_pincode,
            ngo_mobile, 
            ngo_url, 
            ngo_bank_name, 
            ngo_bank_acc_no, 
            ngo_bank_ifsc, 
        } = req.body;
        
        
        if (await ngoModel.findOne({ngo_email : ngo_email})) {
            if(filename) fs.unlinkSync(path.join(__dirname,  '../public/ngoImages/') + filename)
            return res.status(400).json({message: "Email already exists"});
        }

        const hashedPasswd = await bcrypt.hash(ngo_passwd, 10);

        const ngo = await ngoModel.create({ 
            reg_id: reg_id,
            ngo_name : ngo_name,
            ngo_email : ngo_email, 
            ngo_passwd : hashedPasswd,
            ngo_address : ngo_addr,
            ngo_addr : ngo_addr,
            ngo_city : ngo_city,
            ngo_state : ngo_state,
            ngo_country : ngo_country,
            ngo_pincode : ngo_pincode,
            ngo_mobile : ngo_mobile,
            ngo_web_url : ngo_url,
            ngo_bk_name : ngo_bank_name,
            ngo_bk_accNo : ngo_bank_acc_no,
            ngo_bk_ifsc : ngo_bank_ifsc,
            ngo_logo : filename || 'default_user.jpg',
        });
    
        res.status(201).json({message: "NGO Registered Successfully"})
    }
    catch(err){
        if(filename) fs.unlinkSync(path.join(__dirname,  '../public/ngoImages/') + filename);
        res.status(400).json({message: err.message})
    }
}


module.exports.login = async (req, res) => {
    try{
        const {ngo_email, ngo_passwd} = req.body
        
        
        const ngo = await ngoModel.findOne({ngo_email : ngo_email})
        if (ngo) {

            const isValid = await bcrypt.compare(ngo_passwd, ngo.ngo_passwd)

            if (isValid) {
                const token = await jwt.sign(String(ngo._id), process.env.JWT_SECRET_KEY)
                res.status(200).json({message : "NGO Login Successfull", token : token, user : ngo})
            }
            else {
                res.status(401).json({message : "Invalid Password"})
            }
        }
        else{
            res.status(401).json({message : "No account found with the email"})
        }
    }
    catch(err){
        console.log(err);
    }
}

