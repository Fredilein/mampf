const express = require('express')
const db = require('./db')

// Create express instnace
const app = express()

// Init body-parser options (inbuilt with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Require & Import API routes
const user = require('./routes/user')
const recipe = require('./routes/recipe')
const helper = require('./routes/helper')

// Use API Routes
app.use(user)
app.use(recipe)
app.use(helper)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
