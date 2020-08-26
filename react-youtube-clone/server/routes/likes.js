const express = require('express');
const router = express.Router();
const { DisLike } = require('../models/DisLike');
const { Like } = require('../models/Like');

//=================================
//             Like, DisLike
//=================================





router.post("/getlikes", (req, res) => {
    const variable = () =>
    req.body.videoId ? { videoId: req.body.videoId } : { commentId: req.body.commentId  }

    const variable2 = () =>
    req.body.videoId ? { videoId: req.body.videoId, userId: req.body.userId } : { commentId: req.body.commentId, userId: req.body.userId  }

    Like.find(variable())
    .exec((err, likes) =>
    {
        if(err) return res.status(400).send(err);
        Like.findOne(variable2())
        .populate('userId')
        .exec((err, liked) =>
        {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, likes, liked })
        })
        
    })

})

router.post("/getdislikes", (req, res) => {

    const variable = () =>
    req.body.videoId ? { videoId: req.body.videoId } : { commentId: req.body.commentId  }

    const variable2 = () =>
    req.body.videoId ? { videoId: req.body.videoId, userId: req.body.userId } : { commentId: req.body.commentId, userId: req.body.userId  }

    DisLike.find(variable())
    .exec((err, dislikes) =>
    {
        if(err) return res.status(400).send(err);
        DisLike.findOne(variable2())
        .populate('userId')
        .exec((err, disliked) =>
        {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, dislikes, disliked })
        })
        
    })
})

router.post("/clicklike", (req, res) => {

    // const variable = () =>
    // req.body.videoId ? { videoId: req.body.videoId } : { commentId: req.body.commentId  }

    const variable = () =>
    req.body.videoId ? { videoId: req.body.videoId, userId: req.body.userId } : { commentId: req.body.commentId, userId: req.body.userId  }

    if(req.body.liked)
    {
        Like.findOneAndDelete(variable())
        .exec(err =>
            {
                if(err) return res.status(400).send(err);
                return res.status(200).json({ success: true })
            })
    }
    else
    {
        const like = new Like(variable())
        like.save((err, likeInfo) =>
        {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, likeInfo })
        })
    }
})
router.post("/clickdislike", (req, res) => {

    // const variable = () =>
    // req.body.videoId ? { videoId: req.body.videoId } : { commentId: req.body.commentId  }

    const variable = () =>
    req.body.videoId ? { videoId: req.body.videoId, userId: req.body.userId } : { commentId: req.body.commentId, userId: req.body.userId  }

    if(req.body.disliked)
    {
        DisLike.findOneAndDelete(variable())
        .exec(err =>
            {
                if(err) return res.status(400).send(err);
                return res.status(200).json({ success: true })
            })
    }
    else
    {
        const dislike = new DisLike(variable())
        dislike.save((err, dislikeInfo) =>
        {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, dislikeInfo })
        })
    }
})


module.exports = router;
