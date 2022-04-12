import { getLinkPreview } from 'link-preview-js'
const validator = require('express-validator')
const Recipe = require('../models/Recipe')

// Get all
module.exports.list = function (req, res, next) {
  Recipe.find({}, function (err, recipes) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting records.'
      })
    }
    return res.json(recipes)
  })
}

// Get one
module.exports.show = function (req, res) {
  const id = req.params.id
  Recipe.findOne({ _id: id }, function (err, recipe) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.'
      })
    }
    if (!recipe) {
      return res.status(404).json({
        message: 'No such record'
      })
    }
    return res.json(recipe)
  })
}

// Get own
module.exports.own = function (req, res) {
  Recipe.find({ user: req.userData._id }, function (err, recipes) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting records.',
        error: err
      })
    }
    return res.json(recipes)
  })
}

// Create
module.exports.create = [
  // validations rules
  validator.body('title', 'Please enter Recipe Title').isLength({ min: 1 }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

    // initialize record
    const recipe = new Recipe({
      title: req.body.title,
      link: req.body.link,
      tags: req.body.tags,
      public: req.body.public,
      user: req.userData._id
    })

    // save record
    recipe.save(function (err, recipe) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err
        })
      }
      return res.json({
        message: 'saved',
        _id: recipe._id
      })
    })
  }
]

// Delete
module.exports.delete = function (req, res) {
  const id = req.params.id
  Recipe.findByIdAndRemove(id, function (err, recipe) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.'
      })
    }
    return res.json(recipe)
  })
}

module.exports.preview = function (req, res) {
  getLinkPreview(req.link).then((data) => {
    return res.json(data)
  })
}
