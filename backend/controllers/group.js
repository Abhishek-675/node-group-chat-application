const User = require('../models/user');
const Group = require('../models/group');
const UserGroup = require('../models/usergroup');

exports.createGroup = (req, res) => {
    const { name } = req.body;
    Group.create({ name })
        .then(group => {
            res.status(201).json({ message: 'created successfully', group })
        }).catch(err => {
            res.status(500).json({ message: 'server error' });
            console.log(err);
        })
}

exports.getGroups = (req, res) => {
    Group.findAll({attributes:['id','name']})
        .then(groups => {
            res.status(200).json({success:true,groups});
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: 'server error' });
        })
}

exports.addUserToGroup = async(req, res) => {
    try{
        const { groupId, email } = req.body;
    
        const user=await User.findAll({ where: { email } })
        let userToAdd = user[0].id;
            
        const userGroup=await UserGroup.create({userId:userToAdd,groupId:groupId});
        res.status(201).json({message:'added user to the group',userGroup});
    }catch(err){
        console.log(err);
        res.status(401).json({message:'error'});
    }
}

