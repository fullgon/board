const hello = {
    name:"",
    hello : function() {
        console.log("hello" + this.name);
    },

    test : function(callback){
        setTimeout(callback, 3000);
    }
}

hello.hello();
module.exports = hello;

//왜 this는 람다식에서만 가능한지?
//함수표현식의 this는 this가 들어있는 함수 자체를 가르키게 된다.
//람다식의 this는 오브젝트를 가르킨다.