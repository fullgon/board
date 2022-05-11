const hello = require("./test2.js");
hello.name = "문형곤";
hello.hello();
hello.test(() => {
    console.log("3초 뒤 실행")
})