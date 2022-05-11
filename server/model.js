const { Sequelize } = require("sequelize");

//User라는 클래스를 만든다.
global.User = sequelize.define("User",{
    id:{
        type:Sequelize.STRING,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    }

})
sequelize.sync({alter:true})

global.Board = sequelize.define("Board",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,//자동으로 넘버링
        allowNull:false
    },
    //제목
    title: Sequelize.STRING,
    //내용
    body: Sequelize.TEXT,
    //작성시간
    writeTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW//자동으로 현재시간이 입력되도록
    },
    viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})
/*
서버가 돌아가는 원리

프로그램 = 컴퓨터한테 명령을 정의
cpu = 연산 (굉장히 빠르다)
하드디스크 in 소스코드 (data 등) (데이터를 가져오는 속도가 굉장히 느리다)
하드디스크에 있는 데이터를 조금이라도 빠른 ram에 가져와서 
cpu가 ram에있는 데이터를 연산하고 연산결과를 ram에 저장한다.

하나의 cpu 서버에 동시에 많은 사람들 진입하면 과부하.
a라는 사용자의 요청을 ram에 저장 
ram의 요청을 cpu에서 요청 해석(연산)
하드디스크에서 ram으로 요청에대한 정보를 넘기고 그 정보를 cpu에서 처리(연산)한다.
사람들이 많이 오면 올수록 비효율적이다.

2가지상황
카페 : 고객 100명의 줄
톰캣의 경우 손님의 주문서를 받고 커피를 줄 때까지 손님이 기다리고있어야한다.
node.js의 경우 손님의 주문서를 받고 진동벨을 준다.

DB에 원두들이 저장되어있음. DB에서 원두를 가져다 커피를 줘야함. 
톰캣은 점원 5명이 DB까지 왔다갔다하면서 커피를 만들어서 제공, 그 과정을 전부 기록
첫손님이 1000잔을 달라고하면 1000잔이 만들어질 때 까지 뒷 손님들이 계속 기다려야함.
앞에 많은 주문이 들어오면 뒷 사람들은 전부 기다려야만 하는 것이 가장 큰 문제

node.js는 한명이 주문을 받고 4명의 스탭이 주문서를 보고 DB로 오가며 커피를 만들어서 제공, 간단히 기록
첫손님이 1000잔을 달라고 해도 주문서를 받고 진동벨을 전달하여 다른 손님들의 주문도 받을 수 있다.
손님들이 카운터에 주문을 하면 주문서를 점원4명에게 전달하여 4명이 커피를 만들거나 원두를 가져오는 처리를 하며
완료된 커피를 카운터에게 주면 카운터가 손님에게 커피를 전달한다.
자바스크립트의 이벤트 특성 때문에 이와같은 node.js의 일처리 방식이 되었다.
많은 요청을 빠르게 처리할 수 있지만 하나의 요청의 연산이 너무 복잡하다면 비효율적이다.
*/