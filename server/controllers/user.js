const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/users');

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
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
        })

};

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, role: fetchedUser.role, userId: fetchedUser._id }, "ffwr", { expiresIn: "1h" });
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(error => {
            return res.status(401).json({
                message: "Invalid authentication credentials"
            });
        });
}