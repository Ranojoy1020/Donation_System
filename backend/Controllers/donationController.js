const donationModel = require('../Models/donationModel');

module.exports.makeDonation = async (req, res) =>{
    try{
        const {
            user_id,
            ngo_id,
            campaign_id,
            donation_type,
            collection_schedule,
            amount,
            donor_msg
        } = req.body;

        const {filename} = req.file;
        
        const donation = donationModel.create({
        user_id: user_id,
        ngo_id: ngo_id,
        campaign_id: campaign_id,
        donation_type: donation_type,
        collection_schedule: collection_schedule,
        amount: amount,
        txn_id: Date.now() + user_id,
        item_img_path : filename,
        donor_msg: donor_msg,
        });
        return res.status(201).json({message : "Donation Successfull"})
    }
    catch(error){
        console.log(error);
        fs.unlinkSync(path.join(__dirname,  '../public/userImages/') + filename)
        return res.status(500).json({message : "Error in making donation", error : error})
    }
    
}

module.exports.user_donationHistory = async (req, res) => {
    try{
        // const limit = req.query;
        const user_id = req.params.user_id;
        const user_donation = await donationModel.find({user_id: user_id})
        return res.status(200).json(user_donation);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Error in fetching user donation history", error:error})
    }
}


module.exports.ngo_donationHistory = async (req, res) => {
    try{
        const ngo_id = req.params.ngo_id;
        const ngo_donation = await donationModel.find({ngo_id: ngo_id})
        return res.status(200).json(ngo_donation);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Error in fetching ngo donation history",error:error})
    }
}

module.exports.ngo_getPendingDonation = async (req, res) => {
    try{
        const ngo_donation = await donationModel.find({donation_status : 'Pending'})
        return res.status(200).json(ngo_donation);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Error in fetching collection requests",error : error})
    }
}

module.exports.acceptRequest = async (req, res) => {
    const {field, value} = req.query
    try{
        const accept = await donationModel.findOneAndUpdate({_id : field}, {'$set' : {donation_status : value, ngo_id: field}})
        return res.status(200).json(accept);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Error in fetching collection requests",error:error})
    }
}