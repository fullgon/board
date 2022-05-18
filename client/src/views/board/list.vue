<template>
  <div class="root">
      <table>
          <thead>
              <tr>
                  <th width="80px">글 번호</th>
                  <th>제목</th>
                  <th width="100px">작성자</th>
                  <th width="80px">조회수</th>
                  <th width="120px">작성일</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="board in boardList" :key="board.id">
                  <td class="text-center">{{board.id}}</td>
                  <td>{{board.title}}</td>
                  <td class="text-center">
                      <div v-if="board.writeUser">{{board.writeUser.name}}</div>
                  </td>
                  <td class="text-center">{{board.writer}}</td>
                  <td class="text-center">{{board.viewCount}}</td>
                  <td class="text-center">{{dateFormat(board.writeTime)}}</td>
                  <!--filter쓰는 법 {{board.writeTime | dateFormat}} -->
              </tr>
          </tbody>
      </table>

        <v-pagination v-model="page" @input="changePage" :length="pageCount"></v-pagination>


      <div class="text-right mt-2">
          <v-btn color="primary" @click="moveWrite">글쓰기</v-btn>
      </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
    data(){
        return{
            page: 1,
            pageCount: 0,
            boardList: [],
        };
    },
    filters:{
        dateFormat(dataStr){
            return moment(dataStr).format("YYYY-MM-DD HH:mm");
        },
    },
    mounted(){//내가(list.vue) 불렸네? 할 때 호출된다.
        /*for(var i = 0; i < 10; i++){
            this.boardList.push({
                id: i,
                title: "제목" + i,
                writer: "작성자" + i,
                viewCounter : i,
                writeDate: "2020-01-01",
            });
        }*/
        this.axios.post("/api/board/list").then((result)=>{
            console.log(result);
            this.boardList = result.data.boardList;
            this.pageCount = result.data.pageCount;
        });
    },
    
    
    methods:{
        moveWrite(){
            this.$router.push("/board/write");
        },
        dateFormat(dataStr){
            return moment(dataStr).format("YYYY-MM-DD HH:mm");
        },
        changePage(page){
            console.log(page);
            this.axios.post("/api/board/list",{page:page}).then(result=>{
                this.boardList = result.data.boardList;
                this.pageCount = result.data.pageCount;
            })
        }

    }

}

</script>

<style scoped>
.root{
    width: 700px;
    margin: 0 auto;/* 중앙정렬 */ 
}
table {
    width: 100%;
    border-collapse: collapse;
}
table td,th{
    border-bottom: 1px solid #ccc;
    padding-top: 5px;
    padding-bottom: 5px;
}

</style>