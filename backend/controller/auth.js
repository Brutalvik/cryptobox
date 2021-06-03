const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.find(email)

    if(user[0].length !== 1) {
      const error = new Error('User not found!')
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if(!isEqual) {
      const error = new Error('Wrong Password !')
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
        {
          email: storedUser.email,
          userID: storedUser.id
        },
        'secretForToken',
        { expiresIn: '1h'}
    );

    res.status(200).json({ token: token, userID: storedUser.id });

  }
  catch (err) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }

    //middleware
    next(err)
  }
}
