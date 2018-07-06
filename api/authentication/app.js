const express = require('express');
const passport=require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
require('./passport');

const user = require('./routes/user');
const auth = require('./routes/auth');

const app = express();
app.listen(3000,()=>{console.log("Server is running on port 3000")})

app.use('/auth', auth);

app.use('/user', passport.authenticate('jwt', {session: false}), user);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed json web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'ilearnedJWT');
           return res.json({user, token});
        });
    })(req, res);
});
//api 

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
