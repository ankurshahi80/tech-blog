const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Blog model
class Blog extends Model{
    // static upvote(body, models){
    //     return models.Vote.create({
    //         user_id:body.user_id,
    //         post_id:body.post_id
    //     }).then(() => {
    //         // find the post we just voted on 
    //         return Post.findOne({
    //             where: {
    //                 id:body.post_id
    //             },
    //             attributes:[
    //                 'id',
    //                 'post_url',
    //                 'title',
    //                 'created_at',
    //                 // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name 'vote_count'
    //                 [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id=vote.post_id)'),'vote_count']
    //             ],
    //             include:[
    //                 {
    //                     model:models.Comment,
    //                     attributes: ['id','comment_text','post_id','user_id','created_at'],
    //                     include: {
    //                         model: models.User,
    //                         attributes: ['username']
    //                     }
    //                 }
    //             ]
    //         });
    //     });
    // }
};

// create fields/columns for Blog model
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        blog_text: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key:'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName:'blog'
    }
);

module.exports = Blog;
