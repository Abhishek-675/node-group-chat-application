const { Op } = require('sequelize');

const User = require('../models/user');
const Chat = require('../models/chat');

exports.postChat = (req, res) => {
    const { message, name, userId, groupId } = req.body;

    if(groupId !== null){
        Chat.create({ message, name, userId, groupId })
        .then(chat => {
            res.status(201).json({ success: true, message: 'Group message sent', chat });
        })
        .catch(err => {
            console.log(err);
            res.status(403).json({ success: false, message: 'something went wrong' });
        })
    } else{
        Chat.create({ message, name, userId })
            .then(chat => {
                res.status(201).json({ success: true, message: 'message sent', chat });
            })
            .catch(err => {
                console.log(err);
                res.status(403).json({ success: false, message: 'something went wrong' });
            })

    }

}

exports.getChats = async (req, res) => {
    try {
        const LastId = req.query.id;
        const chat = await Chat.findAll({ where: { id: { [Op.gt]: LastId } , groupId:null} });
        res.status(200).json({ success: true, chat });
    } catch (err) {
        console.log(err)
    }
}

exports.getGroupChats=async(req,res)=>{
    try{
        const gId=req.query.gId;
        const gChat = await Chat.findAll({ where: {groupId:gId } });
        res.status(200).json({ success: true, gChat });
    } catch (err) {
        console.log(err)
    }
}
