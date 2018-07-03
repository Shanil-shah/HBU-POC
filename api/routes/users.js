const User = require('../models/user');

function checkUniqueUser(email, db) {
    return db.any("SELECT email FROM users WHERE email = ${e}", {e: email})
    .then( result => {
        console.log(result);
        return result.length == 0;
    });
}

function signup(req, res, db) {
    checkUniqueUser(req.body['email'], db)
    .then( isUnique => {
        console.log(isUnique);
        //Validate email
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('email', 'User already exists').custom(() => {return isUnique});

        //Validate password
        req.checkBody('password', 'Password is required').notEmpty();
        console.log('Password Checked');
    
        const errors =  req.validationErrors();
        if (errors) {
            res.status(400).send('{ error: ' + JSON.stringify(errors[0].msg) + ' }');
        }
        else {
            const newUser = new User({
                email: req.body['email'],
                password: req.body['password']
            });
            newUser.save();
            res.status(200).send('{ msg: ' + JSON.stringify(newUser.toObject()) + ' }');
        }
    });
}

function login(req, res, db) {
    res.status(200).send('{ msg: "We will be back soon" }\n');
}

module.exports = function(app, db){
    app.post('/user/signup', (req, res) => signup(req, res, db));
    app.post('/user/login', (req, res) => login(req, res, db));
};