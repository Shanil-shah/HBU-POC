const bcrypt = require('bcryptjs');
const SchemaObject = require('schema-object');
const pgp   = require('pg-promise');
//Creating a connection
const connection = {
    host: 'localhost',
    port: 5432,
    user: 'hacker',
    password: '',
    database: 'hackerbay'
};
const db      = pgp(connection);

const saltRounds = 13;

var User = new SchemaObject({
    email: String,
    password: String
}, {
    constructors: {
        default: function(values) {
            this.email = values.email
            this.password = bcrypt.hashSync(values.password + values.email, saltRounds);
        },
        fromEmail: function(email) {

        }
    },
    methods: {
        getEmail: function() { return this.email },
        save:   function() {
            db.none('INSERT INTO users(email, password) VALUES(${email}, ${password})', this.toObject()) 
            .then(()=>console.log('success')).then(()=>console.log('failure'));
        },
    },

});

module.exports = User
