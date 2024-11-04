const adminModel = require("../Models/adminModel");
const userModel = require("../Models/userModel");
const ngoModel = require("../Models/ngoModel");

const jwt = require('jsonwebtoken');


module.exports.login = async (req, res) => {
  try {
    const { admin_email, admin_passwd } = req.body;

    const user = await adminModel.findOne({
      $and: [{ admin_email: admin_email }, { admin_passwd: admin_passwd }],
    });

    if (user) {
      const token = await jwt.sign(String(user._id), process.env.JWT_SECRET_KEY)
      res.status(200).json({message : "Login Successfull", token : token, user : user})
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (err) {
    console.log(err);
  }
};

// * Access All user data
module.exports.getAllUser = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await userModel.find({});

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// * Access All ngo data
module.exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await ngoModel.find({});

    res.status(200).json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
