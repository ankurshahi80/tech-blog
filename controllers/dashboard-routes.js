const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/',(req,res)=>{
    
    res.render('dashboard');
});



module.exports = router;