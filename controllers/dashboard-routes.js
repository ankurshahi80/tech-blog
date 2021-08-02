const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/',withAuth,(req,res)=>{
    Blog.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id
        },
        attributes: [
            'id',
            'blog_text',
            'title',
            'created_at',
        ],
        include: [
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
      // serialize data before passing to template
        const blogs = dbPostData.map(blog => blog.get({ plain: true }));
        res.render('dashboard', { blogs, loggedIn: true, dashboardWindow: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/blog/add',(req,res) => {
    res.render('addblog',{dashboardWindow: true});
});

router.get('/edit/:id', withAuth,(req,res) => {
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
    // serialize data before passing to template
      const blog = dbPostData.get({ plain: true });
      console.log(blog);
      res.render('update-blog', { blog, loggedIn: true, dashboardWindow: true });

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
    user_id:req.session.user_id
})
.then(dbPostData => res.json(dbPostData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});


});

module.exports = router;