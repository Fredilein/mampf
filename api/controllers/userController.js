const validator = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const config = require('../config')

// Register
module.exports.register = [
  // validations rules
  validator.body('username', 'Please enter a Username').isLength({ min: 1 }),
  validator.body('email', 'Please enter an Email').isLength({ min: 1 }),
  validator.body('email').custom((value) => {
    return User.findOne({ email: value }).then((user) => {
      if (user !== null) {
        return Promise.reject('Email already in use')
      }
    })
  }),
  validator.body('password', 'Please enter a Password').isLength({ min: 1 }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

    // initialize record
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    // encrypt password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash

    // save record
    user.save(function (err, user) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err
        })
      }
      return res.json({
        message: 'saved',
        _id: user._id
      })
    })
  }
]

// Login
module.exports.login = [
  // validation rules
  validator.body('email', 'Please enter Email').isLength({ min: 1 }),
  validator.body('password', 'Please enter Password').isLength({ min: 1 }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

    // validate email and password are correct
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: 'Error logging in',
          error: err
        })
      }

      if (user === null) {
        return res.status(500).json({
          message: 'Invalid Email or Password entered.'
        })
      }

      // compare submitted password with password inside db
      return bcrypt.compare(
        req.body.password,
        user.password,
        function (err, isMatched) {
          if (isMatched === true) {
            return res.json({
              user: {
                _id: user._id,
                email: user.email,
                username: user.username
              },
              token: jwt.sign(
                { _id: user._id, email: user.email, username: user.username },
                config.authSecret
              )
            })
          } else {
            return res.status(500).json({
              message: 'Invalid Email or Password entered.'
            })
          }
        }
      )
    })
  }
]

// Get User
module.exports.user = function (req, res) {
  const token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(
      token.replace(/^Bearer\s/, ''),
      config.authSecret,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({ message: 'unauthorized' })
        } else {
          return res.json({ user: decoded })
        }
      }
    )
  } else {
    return res.status(401).json({ message: 'unauthorized' })
  }
}
