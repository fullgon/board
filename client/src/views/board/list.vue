<template>
  <div class="root">
      <mjc-header></mjc-header>
      <div class="teable-container">
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
              <tr v-for="board in boardList" :key="board.id" @click="clickBoardItem(board)">
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
      </div>
      

        <v-pagination v-model="page" @input="changePage" :length="pageCount"></v-pagination>


      <div class="text-right mt-2">
          <v-btn color="primary" @click="moveWrite" v-if="$store.state.user">글쓰기</v-btn>
      </div>
  </div>
</template>

<script>
import moment from "moment";
import MjcHeader from '@/components/MjcHeader.vue';
export default {
    components:{
        MjcHeader,
    },
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
        },
        clickBoardItem(board){
            console.log(board);
            this.$router.push("/board/item/"+board.id);
        }

    }

}

</script>

<style scoped>
.teable-container{
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