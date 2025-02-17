const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../middleware/mailer");
const randomstring = require("randomstring");

//* Importing Model
const userModel = require("../Models/userModel");
const queryModel = require("../Models/queryModel");
const { log } = require("console");

module.exports.register = async (req, res) => {
  let filename;
  try {
    if (req.file != undefined) filename = req.file.filename;

    const {
      user_fname,
      user_lname,
      user_email,
      user_passwd,
      user_mobile,
      user_addr,
      user_city,
      user_state,
      user_country,
      user_pincode,
    } = req.body;

    if (await userModel.findOne({ user_email: req.body.user_email })) {
      if (filename)
        fs.unlinkSync(path.join(__dirname, "../public/userImages/") + filename);
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPasswd = await bcrypt.hash(user_passwd, 10);

    const user = await userModel.create({
      user_fname: user_fname,
      user_lname: user_lname,
      user_email: user_email,
      user_passwd: hashedPasswd,
      user_mobile: user_mobile,
      user_addr: user_addr,
      user_city: user_city,
      user_state: user_state,
      user_country: user_country,
      user_pincode: user_pincode,
      profile_pic: filename || "default_user.jpg",
    });

    res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    if (filename)
      fs.unlinkSync(path.join(__dirname, "../public/userImages/") + filename);

    res.status(400).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { user_email, user_passwd } = req.body;

    const user = await userModel.findOne({ user_email: user_email });
    if (user) {
      const isValid = await bcrypt.compare(user_passwd, user.user_passwd);

      if (isValid) {
        const token = await jwt.sign(
          String(user._id),
          process.env.JWT_SECRET_KEY
        );
        res
          .status(200)
          .json({
            message: "User Login Successfully",
            token: token,
            user: user,
          });
      } else {
        res.status(401).json({ message: "Invalid Password" });
      }
    } else {
      res.status(401).json({ message: "No account found with the email" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateProfile = async (req, res) => {
    try {
      // const { id } = req.params;

      const {_id, user_fname, user_lname, user_email, user_mobile, user_addr, user_city, user_state, user_pincode, user_country } =
        req.body;

      
      const user = await userModel.findByIdAndUpdate(
        _id,
        {
          user_fname: user_fname,
          user_lname: user_lname,
          user_email: user_email,
          user_mobile: user_mobile,
          user_addr: user_addr,
          user_city: user_city,
          user_state: user_state,
          user_country: user_country,
          user_pincode: user_pincode,
        },
        { new: true }
      );
      
      res
        .status(200)
        .json({ message: "User Profile Updated Successfully", user: user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

module.exports.savePreference = async (req, res) => {
  try {
    const { user_id, preference } = req.body;
    const user = await userModel.findByIdAndUpdate(user_id, { preference: preference }, { new: true });
    res.status(200).json({ message : "Preferences Saved" , user : user})
  }
  catch(error){
    res.status(400).json({ message : error.message })
  }
}

module.exports.updatePasswd = async (req, res) => {
  try {
    const { user_email, user_passwd, new_passwd } = req.body;
    const user = await userModel.findOne({ user_email: user_email });

    if (user) {
      const isValid = await bcrypt.compare(user_passwd, user.user_passwd);
      if (isValid) {
        const hashedPasswd = await bcrypt.hash(new_passwd, 10);
        user.user_passwd = hashedPasswd;
        await user.save();
        res.status(200).json({ message: "Password Updated Successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.forgotPasswd = async (req, res) => {
  try {
    const { user_email } = req.body;
    const user = await userModel.findOne({ user_email: user_email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "No account found with the email" });
    }

    const token = randomstring.generate();
    const data = await userModel.updateOne(
      { user_email: user_email },
      { $set: { reset_token: token } }
    );

    try {
      sendEmail(
        user_email,
        "Reset Password",
        `Click the link to reset password ${
          "localhost:" +
          process.env.PORT +
          "/api/user/reset_passwd?reset_token=" +
          token
        }`
      );
    } catch (err) {
      res.json({ message: err });
    }

    res.status(200).json({ message: "Reset link is sent to your email." });
  } catch (error) {
    console.log(error);
  }
};

module.exports.resetPasswd = async (req, res) => {
  try {
    const { reset_token } = req.query;

    const { new_passwd } = req.body;
    const user = await userModel.findOne({ reset_token: reset_token });

    if (user) {
      const hashedPasswd = await bcrypt.hash(new_passwd, 10);
      user.user_passwd = hashedPasswd;
      user.reset_token = "";
      await user.save();

      res.status(200).json({ message: "Password Reset Successfull" });
    } else {
      res.status(404).json({ message: "Link has expired." });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.submitQuery = async (req, res) => {
  try {
    const { query_msg, user_id } = req.body;
    const user = await userModel.findOne({ _id: user_id });
    
    const newQuery = new queryModel({ query_msg: query_msg, user_id: user._id });
    await newQuery.save();

    res.status(200).json({ message: "Query submitted successfully." });
    
  } catch (error) {
    console.log(error);
  }
};

module.exports.userQuery = async (req, res) => {
  
  try {
    const { id } = req.params
    
    const query = await queryModel.find({user_id: id})    
    res.status(200).json(query)
  }
  catch(error){
    res.status(500).json({message : error.message})    
  }

}
