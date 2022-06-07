<template>
    <div class="header">
        <v-layout>
            <div class="logo" @click="moveMain">Mjc 게시판</div>
            <v-spacer></v-spacer>
            <div>문형곤</div>
        </v-layout>
    </div>
</template>

<script>
export default {
    methods:{
        moveMain(){
            this.$router.push("/board");
        },
    },
}
</script>

<style scoped>
.header {
    padding: 10px 20px;
    box-shadow: 0 6px 6px #eee;
}
.header .logo{
    cursor: pointer;
}
</style>