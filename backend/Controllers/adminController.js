const adminModel = require("../Models/adminModel");
const userModel = require("../Models/userModel");
const ngoModel = require("../Models/ngoModel");
const queryModel = require("../Models/queryModel");

const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  try {
    const { admin_email, admin_passwd } = req.body;

    const user = await adminModel.findOne({
      $and: [{ admin_email: admin_email }, { admin_passwd: admin_passwd }],
    });

    if (user) {
      const token = await jwt.sign(
        String(user._id),
        process.env.JWT_SECRET_KEY
      );
      res
        .status(200)
        .json({ message: "Login Successfull", token: token, user: user });
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
    // const { id } = req.params;

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

module.exports.getOpenQueries = async (req, res) => {
  try {
    const queries = await queryModel.find({query_status: 'open'})
    
    if(queries) res.status(200).json(queries);

  } catch (error) {
    res.status(500).json({ message: error.message })
  } 
}

module.exports.getUnverifiedNgos = async (req, res) => {
  try {
    const ngos = await ngoModel.find({ is_verified: false });

    res.status(200).json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.verifyNgo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const ngo = await ngoModel.findByIdAndUpdate(id, { is_verified: true }, { new: true });
    res.status(200).json({ message: "Ngo Verified" });
  }
  catch(error){
    res.status(500).json({ message: error});
  }

}

module.exports.deleteUser = async(req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

module.exports.deleteNgo = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await ngoModel.findByIdAndDelete(id);
    res.status(200).json({ message: "NGO deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.answerQuery = async (req, res) => {
  try {
    const { query_id, answer } = req.body;
    const query = await queryModel.findById(query_id);
    if (query) {
      query.query_resp = answer;
      query.query_status = 'closed'
      await query.save();
      res.status(200).json({ message: "Query answered successfully" });
    } else {
      res.status(404).json({ message: "Query not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
