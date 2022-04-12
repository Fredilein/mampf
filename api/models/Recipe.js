const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Include a title']
  },
  link: {
    type: String
  },
  tags: {
    type: [String]
  },
  user: {
    type: String,
    required: true
  },
  public: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
