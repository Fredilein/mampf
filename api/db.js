const mongoose = require('mongoose')

// You don't need to create DB from mongodb terminal. Mongoose creates the db automatically.
mongoose.connect('mongodb://localhost/mampf', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback () {
  console.log('MongoDB Connected...')
})

module.exports = db
