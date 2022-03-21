var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/musics', function(req, res, next) {
  console.log("start quering...")
  
  req.music.find(function(err, docs) {
    if (err === null)
      res.json(docs);
    else 
      res.send({msg: err });
  });
  // res.render('index', { title: 'Express' });

});

router.get('/sidebar', function(req,res,next){
  console.log("side bar called")
  req.music.find().distinct('Category', function(err, cats){
    if (err === null){
      res.send({msg: cats, err:''})
    } 
    else{
      console.log("onfailure")
      res.send({msg: '', err:err });
    } 
  });
})

router.get('/checklogin', function(req,res,next){
  console.log("someone check login!")
  sess= req.session
  if (sess.login){
    console.log('logined', sess);
    res.send({msg : "login", err:''})
  }
  else{
    console.log('logout', sess);
    res.send({msg : "logout", err:''})
  }
})

router.get('/logout', function(req,res,next){
  console.log("someone try logout!")
  if (req.session.login){
    req.session.destroy((err) => {
    if (err){
      console.log("Cannot access session");
    }
    else{
        console.log('logout')
        res.send({msg : "logout", err:''})
    }
    })
    
  }
  else{
    console.log('already logout', sess);
    res.send({msg : "failed", err:''})
  }
})

router.post('/delorder', function(req,res,next){
  console.log("someone try del order!")
  req.cart.deleteOne({_id : req.body.id},function(err, result){
    if(err === null){
      console.log(result)
      res.send({msg : 'success', err:''})
    }
    else{
      console.log('error!')
      res.send({msg : '', err:err})
    }
  })
})

router.get('/cart', function(req,res,next){
  console.log("someone check cart")
  if (req.session.login){
    console.log("logged in")
    req.cart.find({UserID: req.session.userid}, function(err, carts){
      if(err === null){
        console.log(carts)
        res.send({msg : carts, err:''})
      }
      else{
        console.log('error!')
        res.send({msg : '', err:err})
      }
    })
  }
  else{
    console.log("logged out")
    req.cart.find({UserID: req.session.id}, function(err, carts){
      if(err === null){
        console.log(carts)
        res.send({msg : carts, err:''})
      }
      else{
        console.log('error!')
        res.send({msg : '', err:err})
      }
    })
  }
})


router.post('/order', function(req,res,next){
  console.log("someone try to order")
  console.log(req.body.musicid,req.music.num, req.session.id)
  if (req.session.login){
    var order = new req.cart({
      MusicId: req.body.musicid,
      UserID: req.session.userid,
      Quantity : req.body.num
    })
    console.log(order)
    order.save((err, result) => {
      if (err) {
        res.send({msg : "err", err:err})
      } else {
        res.send({msg : "add", err:''})
      }
      });
  }
  else{
    var order = new req.cart({
      MusicId: req.body.musicid,
      UserID: req.session.id,
      Quantity : req.body.num
    })
    console.log(order)
    order.save((err, result) => {
      if (err) {
        res.send({msg : "err", err:err})
      } else {
        res.send({msg : "add", err:''})
      }
      });
      
  }
})

router.post('/search', async function(req,res,next){
  console.log("searched some musics...")
  let musiclist = []
  let musicidlist =[]
  for(var i=0; i<req.body.word.length; i++){
    console.log(req.body.word[i])
    await req.music.find({MusicName: { $regex: '.*' + req.body.word[i] + '.*' }}, function(err, musics){
      if (err === null){
        sess= req.session
        if (sess.login)
          console.log('logined', sess);
        else
          console.log('not login', sess);
        for(var j=0; j< musics.length; j++){
          if(musicidlist.indexOf(musics[j].MusicId)<0){
            musicidlist.push(musics[j].MusicId)
            musiclist.push(musics[j])
          }
        }
      } 
      else{
        console.log("onfailure")
      } 
    });
    await req.music.find({Composer: { $regex: '.*' + req.body.word[i] + '.*' }}, function(err, musics){
      if (err === null){
        console.log("searched by Composer:",musics)
        for(var j=0; j< musics.length; j++){
          if(musicidlist.indexOf(musics[j].MusicId)<0){
            musicidlist.push(musics[j].MusicId)
            musiclist.push(musics[j])
          }
        }
      } 
      else{
        console.log("onfailure")
      } 
    });
  }
  console.log("try to send:", musiclist)
  res.send({msg : musiclist, err:''})
})

router.post('/getmusicimage2', function(req,res,next){
  // console.log("post")
  req.music.find({MusicId : req.body.music }, function(err, musics){
    if (err === null){
      if(musics.length > 0){
        // var encodedImage = " "
        // var encodedClip = " "
        imgway = "/images/" + musics[0].Image
        clipway= "/clips/" + musics[0].Clip
        console.log(musics[0].Image)
        console.log(musics[0].Clip)
        fs.readFile(path.join(__dirname, '../public', imgway), function(err, data) {
          if (err) throw err;
          var encodedImage = new Buffer(data, 'binary').toString('base64');
          // res.send({image: encodedImage})
          console.log("get image")
          fs.readFile(path.join(__dirname, '../public', clipway), function(err, data) {
            if (err) throw err;
            var encodedClip = new Buffer(data, 'binary').toString('base64');
            // res.send({clip: encodedClip})
            res.send({image: encodedImage,clip: encodedClip})
            console.log("get clips")
            // return encodedClip
          });
          // return encodedImage
        });

        // fs.readFile(path.join(__dirname, '../public', clipway), function(err, data) {
        //   if (err) throw err;
        //   var encoded = new Buffer(data, 'binary').toString('base64');
        //   // res.send({clip: encodedClip})
        //   console.log("get clips")
        //   // return encodedClip
        // });

        // res.send({image: encodedImage},{clip: encodedClip})
        // encodedImage = " "
        // encodedClip = " "
      }
    } 
    else{
      console.log("onfailure")
      res.send({msg: '', err:err });
    } 
  })
})

// router.post('/getmusicclip', function(req,res,next){
//   req.music.find({MusicId : req.body.music }, function(err, musics){
//     if (err === null){
//       if(musics.length > 0){
//         way = "/clips/" + musics[0].Clip
//         fs.readFile(path.join(__dirname, '../public', way), function(err, data) {
//           if (err) throw err;
//           var encodedClip = new Buffer(data, 'binary').toString('base64');
//           res.send({clip: encodedClip})
//           console.log("get clips")
//         });
//       }
//     } 
//     else{
//       console.log("onfailure")
//       res.send({msg: '', err:err });
//     } 
//   })
// })

router.post('/musiccat', function(req,res,next){
  console.log("search musics by category")
  console.log("category:", req.body.cat)
  if(req.body.cat === "all"){
    req.music.find(function(err, musics){
      if (err === null){
        res.send({msg: musics, err:''})
      } 
      else{
        console.log("onfailure")
        res.send({msg: '', err:err });
      } 
    });
  }
  else{
    req.music.find({Category: req.body.cat}, function(err, musics){
      if (err === null){
        res.send({msg: musics, err:''})
      } 
      else{
        console.log("onfailure")
        res.send({msg: '', err:err });
      } 
    });
  }
})

router.get('/checkout', function(req,res,next){
  console.log("check out (delete)")
  console.log("category:", req.body.cat)
  if(req.session.login){
    req.cart.deleteMany({UserID: req.session.userid}, function(err, result){
      if (err === null){
        console.log("deleted")
        res.send({msg: "checkout", err:'' });
      }
      else{
        console.log("err!")
        res.send({msg: "", err:err });
      }
    })
  }
  else{
    req.cart.deleteMany({UserID: req.session.id}, function(err, result){
      if (err === null){
        console.log("deleted")
        res.send({msg: "checkout", err:'' });
      }
      else{
        console.log("err!")
        res.send({msg: "", err:err });
      }
    })

  }
})

router.post('/login', function(req, res, next) {
  console.log("someone try to login!")
  console.log("theif:",req.body.userid)
  req.user.find({UserID : req.body.userid },function(err, docs) {
    console.log(req.body.userid,req.body.pw);
    if (err === null){
      if(docs.length > 0){
        console.log(docs[0], docs[0].UserID ,docs[0].PW);
        if(req.body.pw == docs[0].PW){
          var sess = req.session
          sess.login = true
          sess.userid = req.body.userid
          req.session.save()
          console.log(req.session)
          req.session.save()
          res.send({msg: "login", err:'' });
        }
        else{
          console.log("wrong PW")
          res.send({msg: "wrongpw", err:'' });
        }
      }
      else{
        console.log("nouser")
        res.send({msg: "nouser", err:''});
      }
    } 
    else{
      console.log("onfailure")
      res.send({msg: '', err:err });
    } 
  });

});

router.post('/create', function(req, res, next) {
  console.log("someone try to join!")
  console.log("new theif:",req.body.userid)
  req.user.find({UserID: req.body.userid},function(err, docs) {
    console.log(req.body.userid,req.body.pw);
    if (err === null){
      if(docs.length > 0){
        console.log(docs[0], docs[0].UserID ,docs[0].PW);
        console.log("already exist!")
        res.send({msg: "exist", err:'' });
      }
      else{
        console.log("create user...")
        let theif = new req.user({
          UserID: req.body.userid,
          PW: req.body.pw
        });
        theif.save((err, result) => {
          if (err) {
            console.log("Database error when try to add!");
            res.send({msg: '', err:err });
          } else {
            res.send({msg: 'added', err:'' });
          }
        });
      }
    } 
    else{
      console.log("failure when searching...")
      res.send({msg: '', err:err });
    } 
  });

});



module.exports = router;
