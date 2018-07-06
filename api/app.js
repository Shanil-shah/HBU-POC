const express = require('express'); 
const app = express(); 
const morgan=require('morgan');
const config = require('./config/main');
const bodyParser=require('body-parser');


//Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const routes =require("./routes/routes.js")(app);
const users=require("./routes/users");
let data={};
///new modules required
const path              = require('path');
const cookieParser      = require('cookie-parser');
const exphbs            = require('express-handlebars');
const expressValidator  = require('express-validator');
const flash             = require('connect-flash');
const session           = require('express-session');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
//Postgres database connection
const pgp=require('pg-promise') //module requirement
//creating a connection
const connection={
	host:'localhost',
	port:5432,
	user:'hackerbay',
	password:'',
	database:'userdata'
};
const db = pgp(connection);

// JSON Formatting
app.set('json spaces', 4);

 //Set Static Foler (style sheets, images)
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({ 
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));

// Passport init
app.use(passport.initialize()); 
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
          var namespace = param.split('.')
          , root = namespace.shift()
          , formParam = root;

        while(namespace.length) {
            formParam += '[' +  namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value: value,
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    
    next();
});

//log request to console
app.use(morgan('dev'));


// Bring in defined Passport Strategy
require('./config/passport')(passport);

// View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');


require('./routes')(app, db);
//listen method starts a server and listen on the port 3000
app.listen(port, function () {
  console.log('App listening on port :' + port );
});
