const express = require('express');
const db = require('../database');
const User = require('../models/user');
const corsPermissions = require('../middlewares/cors');
const delay = require('../middlewares/delay');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use(corsPermissions);
router.use(delay);


// router.get("", (req, res, next) => {
//   db.getDocs(Post).then((data) => {
//     res.status(200).json(data);
//   }).catch((err) => {
//     res.status(500).json(err);
//   });
// });


router.post("", (req, res, next) => {
    if (req.body) {
        let user = new User(req.body);

        db.getDocsBy(User, { username: user.username })
            .then((result) => {
                if (result) {
                    res.status(400).json({ msg: "username already taken" });
                } else {
                    db.addDoc(user).then((createdUser) => {
                        res.status(200).json(createdUser);
                        console.log("succecssfully added user to database")
                    }).catch((err) => {
                        console.log(err)
                        res.status(500);
                    })
                }
            }).catch(err => {
                console.log(err)
                res.status(500);
            })
    } else {
        res.status(500);
    }

});

router.post("/signin", (req, res, next) => {
    let user = new User(req.body);
    db.getDocsBy(User, { username: user.username, password: user.password })
        .then((result) => {
            if (result) {
                res.status(200).json({ token: jwt.sign({ username: user.username, password: user.password }, 'shhhhh') });
            } else {
                res.status(401).json({ msg: "username or/and password is wrong." })
            }
        }).catch(err => {
            console.log(err)
            res.status(500);
        })

});



// router.get("/:id", (req, res, next) => {
//     db.getDoc(Post, req.params.id).then((data)=>{
//         res.status(200).json(data);
//     }).catch((err)=>{
//         res.status(500).json(err);
//     });   

// });


// router.delete("/:id", (req, res, next) => {
//     db.rmDoc(Post, req.params.id).then((metaData)=>{
//         console.log(metaData);
//         if(metaData.deletedCount > 0){
//             res.status(202).json({msg:`Successfuly deleted doc with id ${req.params.id}`});
//         }else{
//             res.status(404).json({msg:`No doc with id ${req.params.id} exists`});
//         }
//     }).catch((err)=>{
//         res.status(500).json(err);
//     })
// });


// router.put("/:id", (req, res, next) => {
//     db.editDoc(Post, req.params.id, req.body).then(()=>{
//         res.status(200).json(req.body);
//     }).catch((err)=>{
//         res.status(500).json(err);
//     })

// });


module.exports = router;