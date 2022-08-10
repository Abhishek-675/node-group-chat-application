const bycrypt = require('bcrypt');

const User = require('../models/user');

exports.signup = (req, res) => {
    const {name, email, phone, password} = req.body;

    User.findOne({where: {email: req.body.email}}).then(()=>{
        res.status(403).json({success: false, message: 'email already exits'});
    })

    const saltRounds = 10;
    bycrypt.genSalt(saltRounds, function(err, salt) {
        bycrypt.hash(password, salt, function(err, hash) {
            if (err) {
                console.log(err);
                res.status({message: 'something went wrong'});
            }
            User.create({name, email, phone, password: hash})
            .then(() => {
                res.status(201).json({success: true, message: 'user created successfully'});
            })
            .catch((err) => {
                console.log(err);
            })
        })
    });
};