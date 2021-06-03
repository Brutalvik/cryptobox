const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user')

exports.register = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const userDetails = {
            username: username,
            email: email,
            password: hashedPassword,
        }

        const result = await User.save(userDetails);

        res.status(201).json({ message: 'User Registered Successfully.' })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        //middleware
        next(err)
    }
}