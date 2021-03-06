const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const localSignin = require('./passport/local-signin')
const localSignup = require('./passport/local-signup')

//connect mongo db
const db = require('./config/db.js')
mongoose.connect(db, err => {
  if (err) throw err
  console.log('Connected to MongoDB...')
})

// init user
// const User = require('./model/UserSchema');
// const newUser = new User({ username: 'maoyu', password: 'maoyu' });
// newUser.save();
// import routes
const index = require('./routes/index')
const posts = require('./routes/posts')
const poetries = require('./routes/poetries')
const signup = require('./routes/signup')
const signin = require('./routes/signin')
const logout = require('./routes/logout')
const category = require('./routes/category')

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: 'beingtowardsdeatch',
    resave: false,
    saveUninitialized: false,
    name: 'leonard'
  })
)
app.use(passport.initialize())
app.use(passport.session())
passport.use('local-signup', localSignup)
passport.use('local-signin', localSignin)
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
app.use(cors())

// auth-check middleware
const applyAuthCheck = require('./passport/auth-check')

app.use('/', index)
app.use('/api/posts', posts)
app.use('/api/poetries', poetries)
app.use('/api/signup', signup)
app.use('/api/signin', signin)
app.use('/api/logout', logout)
app.use('/api/category', category)

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
})

module.exports = app
