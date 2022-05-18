var express = require('express');
var router = express.Router();

router.post("/write", async function(req, res){
    if(req.session.user){
        req.body.userId = req.session.user.id;
    }
    await Board.create(req.body);
    res.json({
        result: "ok"
    });
});

const Pager = require("node-jyh-pager");
const pager = new Pager({
    itemPerPage: 5,
});

router.post("/list", async function(req,res){
    const itemPerPage = 5;
    let page = req.body.page;
    if(!page){
        page = 1;
    }
    let offset = pager.getSkip(page);
    const boardList = await Board.findAll({
        include:{
            model : User,
            as : "writeUser"
        },
        limit: itemPerPage,
        offset: offset,
        order: [['writeTime', 'DESC']]
    });
    const count = await Board.count(); //select count(*) from Board
    const nav = pager.getBottomNav(page, count);
    const pageCount = nav.totalPage;//올림함수를 통해 페이지 수 계산 Math.ceil(count / itemPerPage)
    res.json({
        boardList: boardList,
        pageCount: pageCount
    });
})

module.exports = router;