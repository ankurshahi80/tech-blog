const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// get all blogs
router.get('/',(req,res) => {
    console.log('===================');
    Blog.findAll({
        attributes:['id','blog_text','title','created_at'],
        order: [['created_at','DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a blog
router.get('/:id',(req,res) => {
    Blog.findOne({
        where:{
            id: req.params.id
        },
        attributes: ['id','blog_text','title','created_at'],
        include: [
            // include the Comment model here:
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message:'No blog found with this id'})
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post a blog
router.post('/',(req,res) => {
    // expect {title: 'Why MVC is so important', blog_text: 'MVC allows developers to maintain a true seperation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic', user_id: 1}
    Blog.create({
        title: req.body.title,
        blog_text: req.body.blog_text,
        user_id:req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a blog
router.put('/:id',(req,res) => {
    Blog.update(
        {
            title: req.body.title,
            blog_text: req.body.blog_text
        },
        {   where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No blog found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a blog
router.delete('/:id',(req,res) => {
    Blog.destroy({
        where: {
            id: id.req.params
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message:'No blog found with this id.'});
            return;
        }
        res(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;