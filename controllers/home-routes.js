const router = require('express').Router();
const { response } = require('express');
const sequelize = require('../config/connection');
const { Blog, User, Comment,Vote } = require('../models');

router.get('/',(req,res)=>{
    console.log('===============');
    Blog.findAll({
        attributes:[
            'id',
            'blog_text',
            'title',
            'created_at',
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),'vote_count']
        ],
        include: [
    //     //     {
    //     //         model: Comment,
    //     //         attributes: ['id','comment_text','post_id','user_id','created_at'],
    //     //         include: {
    //     //             model:User,
    //     //             attribute: ['username']
    //     //         }
    //     //     },
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData => {
        const blogs = dbPostData.map(blog => blog.get({plain:true}));
        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });         
});

router.get('/blog/:id',(req,res)=>{
    console.log('===============');
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes:[
            'id',
            'blog_text',
            'title',
            'created_at',
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text','blog_id','user_id','created_at'],
                include: {
                    model:User,
                    attribute: ['username']
                }
            },
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData => {

        if(!dbPostData) {
            res.status(404).json({message:'No blog found with this id'});
            return;
        }

        const blog = dbPostData.get({plain:true});

        res.render('comment', {
            blog,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });         
});

router.get('/login',(req,res)=>{
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login');
});

router.get('/signup',(req,res)=>{
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('signup');
});

router.get('/post-comment',(req,res)=> {
    res.render('post-comment');
})

module.exports=router;