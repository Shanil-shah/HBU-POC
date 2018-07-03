const apiRoutes = require('./routes');
const apiUsers = require('./users')

const express = require('express');
const router = express.Router();

module.exports = function(app, db) {
    apiRoutes(app,db);
    apiUsers(app,db);
};