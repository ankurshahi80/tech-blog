const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/',(req,res) => {
    Comment.findAll()
    .then(dbCommentData=>res.json(dbCommentData))
    .catch(err=>{
        console.log(err).
        res.status(500).json(err);
    });
});

router.post('/',(req,res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        blog_id: req.body.blog_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err=>{
        console.log(err);
        res.status(400).json(err);
    });
});

router.put('/:id', (req,res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text,
        },
        {   where: {
                id: req.params.id
            }
        }
    )
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({message: 'No blog found with this id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/',(req,res) => {
    Comment.destroy({
        where: {
            id:req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({message: 'No Comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;