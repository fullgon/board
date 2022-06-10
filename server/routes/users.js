var express = require('express');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/join", async function(req, res){
  var body = req.body
  console.log(body)
  
  const alreadyUser = await User.findOne({
    where:{
      id:body.id
    }
  });
  if(alreadyUser != null){
    res.json({
      result: "fail",
      message:"이미 존재하는 아이디입니다."
    })
    return;
  }

  /*
  User.create(body).then(result =>{
    res.json({
      result: "ok"
    })
  })*/

  const result = await User.create(body)
  res.json({
    result:"ok"
  })
})

router.post("/login", async function(req, res){
  console.log(req.body);
  const user = await User.findOne({
    attributes:["id", "name"],
    //DB에서 req로 받은 id와 password가 일치하는 사람이 있는지 검색
    where:{
      id: req.body.id,
      password: req.body.password
    }
  })
  if(user == null){
    res.json({
      result:"fail",
      message:"아이디 또는 비밀번호가 잘못되었습니다."
    })
    return;
  }
  req.session.user = user;
  res.json({
    result:"ok",
    uesr: user
  })
})

router.post("/info", async (req, res) =>{
  //로그인 되어있을 때
  if(req.session.user){
    res.json({
      result:"ok",
      user: req.session.user
    })
  }
  else{
    //로그인되지 않았을 때
    res.json({
      result: "fail"
    })
  }  
})

router.post("/logout", async (req, res)=>{
  req.session.destroy()
  res.json({
    result: "ok"
  })
})

module.exports = router;
