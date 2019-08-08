const express = require('express');
const db = require('../database');
const Post = require('../models/post');
const corsPermissions = require('../middlewares/cors');
const delay = require('../middlewares/delay');
const router = express.Router();

router.use(corsPermissions);
router.use(delay);

router.get("", (req, res, next) => {
    db.getDocs(Post).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Tezk 7amra"});
    });   
});


router.post("", (req, res, next) => {
    let post = new Post(req.body);
    db.addDoc(post).then((createdPost)=>{
        res.status(200).json(createdPost);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Tezk 7amra"});
    })

});


router.get("/:id", (req, res, next) => {
    db.getDoc(Post, req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Tezk 7amra"});
    });   
    
});


router.delete("/:id", (req, res, next) => {
    db.rmDoc(Post, req.params.id).then((metaData)=>{
        console.log(metaData);
        if(metaData.deletedCount > 0){
            res.status(202).json({msg:`Successfuly deleted doc with id ${req.params.id}`});
        }else{
            res.status(404).json({msg:`No doc with id ${req.params.id} exists`});
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Tezk 7amra"});
    })
});


router.put("/:id", (req, res, next) => {
    db.editDoc(Post, req.params.id, req.body).then(()=>{
        res.status(200).json(req.body);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Tezk 7amra"});
    })

});


module.exports = router;