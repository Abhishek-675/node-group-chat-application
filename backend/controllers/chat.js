const { Op } = require('sequelize');
const chatRoutes = require('../routes/chat');

// const User = require('../models/user');
const Chat = require('../models/chat');

exports.postChat = (req, res) => {
    const { message, name, groupId } = req.body;

        req.user.createChat({ message, name, groupId })
        .then(chat => {
            res.status(201).json({ success: true, message: 'Group message sent', chat });
        })
        .catch(err => {
            console.log(err);
            res.status(403).json({ success: false, message: 'something went wrong' });
        })
}

exports.getChats = async (req, res) => {
    try {
        const lastId = req.query.id;
        const gId = req.query.gId;
        const chat = await Chat.findAll({ where: { id: { [Op.gt]: lastId } , groupId:gId} });
        res.status(200).json({ success: true, chat });
    } catch (err) {
        console.log(err)
    }
}
