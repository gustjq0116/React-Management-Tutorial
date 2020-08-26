const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");
const multer = require('multer');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

//=================================
//             video
//=================================





router.post("/uploadfiles", (req, res) => {
   

    const fileFilter = (req, file, cb) =>
    {
        const ext = file.originalname.slice(file.originalname.indexOf('.') + 1).toLowerCase(); //업로드 파일 확장자 검색
        //console.log(ext); //파일확장자

        //const ext = path.extname(file.originalname);
        if(ext !== 'mp4')  //해당 확장자 아니면 
        {
            // return cb(res.status(400).end('only mp4 is allowed'), false);
            return cb(new Error('I don\'t have a clue!'), false); //에러와 함꼐 업로드 실패
        }
        cb(null, true) //업로드 성공
    // cb(null, false);
    }
    let storage = multer.diskStorage({
        destination: (req, file, cb) =>
        {
            cb(null, "uploads/"); //업로드 위치
        },
        filename: (req, file, cb) =>
        {
            cb(null, `${Date.now()}_${file.originalname}`); //업로드 파일명
        }
    });
    
    const upload = multer({ storage: storage, fileFilter:fileFilter }).single("file");

    upload(req, res, (err) => 
    {
        if(err)
        {
           // console.log(err);
            return res.json({ success: false, err})  //업로드 실패와 에러메시지
        }
        //return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
       // console.log(req.file);
        return res.json({ success: true, url: req.file.path, fileName: req.file.filename}) //업로드 성공과 파일 업로드 위치, 이름


    })
   //console.log(req)
    //res.json({file: req.file})
});

router.post("/thumbnails", (req, res) => {
    //썸네일 생성 하고 비디오 러닝타임 가져오기
    let filePath ="";
    let fileDuration="";
    //console.log(req.body);
    //비디오 정보 가져오기
    
    ffmpeg.ffprobe(req.body.url, (err, metadata) =>
    {
        //console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    //썸네일 생성

    ffmpeg(req.body.url)
    .on('filenames', (filenames) =>
    {
        filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on('end', () =>
    {
        return res.json({ success: true, url: filePath, fileDuration: fileDuration})
    })
    .on('error', (err) =>
    {
        return res.json({ success: false, err })
    })
    .screenshots({
        count: 3,
        folder: 'uploads/thumbnails/',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })

});

router.post("/uploadVideo", (req, res) => {
    //비디오 정보 DB 저장
    const video = new Video(req.body);

    video.save((err, doc) =>
    {
        if(err) return res.json({ success: false, err})
        res.status(200).json({ success: true});
    })
});

router.get("/getVideos", (req, res) => {
    //비디오를 DB에서 가져온다
    Video.find()
    .populate('writer')
    .exec((err, videos) =>
    {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, videos});
    })
});

router.post("/getVideoDetail", (req, res) => {
    //비디오 디테일을 DB에서 가져온다
    Video.findOne({'_id': req.body.videoId})
    .populate('writer')
    .exec((err, videoDetail) =>
    {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success:true, videoDetail:videoDetail})
    })
    
});

router.post("/getSubscriptionVideos", (req, res) => {

    //userFrom 으로 userTo 를 찾음
    Subscriber.find({ userFrom: req.body.userFrom})
    .exec((err, subscriberInfo) =>
    {
        if(err) return res.status(400).send(err);
        
        let subscribedUser = [];
        

        subscriberInfo.map((subscriber, i) =>
        {
            subscribedUser.push(subscriber.userTo);
        })

        console.log(subscribedUser);
        //찾은 userTo들의 비디오를 가져온다
        Video.find({ writer: { $in: subscribedUser }})
        .populate('writer')
        .exec((err, videos) =>
        {
            //console.log(err);
           // console.log(videos);
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, videos })
        })

    })
});







module.exports = router;
