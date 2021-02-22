const User = require('../models/users');

exports.createUser = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    User.findOne({ email: req.body.email })
        .then(foundedUser => {
            if (!foundedUser) {
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User Created!'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "Invalid authentication credentials"
                        })
                    })
            } else {
                res.status(409).json({
                    message: 'Email already exists!',
                })
            }
        })
};