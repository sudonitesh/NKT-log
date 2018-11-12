const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const ejs = require('ejs')
const engine = require('ejs-mate')
const passport = require('passport')

const config = require('./config/database')
//connnect to db
mongoose.connect(config.database);
const db= mongoose.connection;

db.on('error', 
    console.error.bind(console, 'connection error:')    
)
db.once('open', () => {
    console.log('Connected to db')
})

const app = express()

// set public folder
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.engine('ejs', engine)
app.set('view engine', 'ejs')


//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//session
app.use(session({
    secret: 'some secret',
    // resave: false,
    // cookie: {secure: true},
    saveUninitialized: true
    
}))

app.use(passport.initialize());
app.use(passport.session());

//express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

//express messages
app.use(require('connect-flash')())
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next()
})

//set routes
const indexRouter = require('./routes/index')

//use routes
app.use('/', indexRouter)


// start server after checking port
function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
  
    if (port >= 0) {
      return port;
    }
  
    return false;
  }
const port = normalizePort(process.env.PORT || '3000');

app.listen(port, ()=>{
    console.log(`server on port ${port}`)
})