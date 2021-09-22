const Post = require('../../models/Post');
const User = require('../../models/User');
module.exports = {
    home: async (req,res) => {
        let userPosts = await Post.find({user: req.user._id}).populate('user post');
        // let pageTitle = 'Home Page';
        console.log('userPost');
        res.render('default/index', {userPosts});  
    },

    postHome: async (req, res) => {
        let {post} = req.body;

        if (!post) {
            req.flash('error-message', 'Please enter a message');
            return res.redirect('back');
        }

        let postExist = await Post.findOne({_id: req.params._id});

        if(!postExist) {
            req.flash('error-message', 'No post found');
            return res.redirect('back');
        }

        let newPost = new Post ({
            post
        });

        console.log(newPost);

        newPost.save()
        .then((post) => {
            postExist.posts.push(post._id);
            postExist.save();
            console.log(postExist);
            req.flash('success-message', 'Post sent');
            res.redirect('back');
        })
        .catch((error) => {
            if(error){
                req.flash('error-message', error.post);
                res.redirect('/');
            }
        });
    }

}