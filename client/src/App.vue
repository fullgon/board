<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      name:"",
    };
  },
};
</script>
<style scoped>
body,html{
  height:100%;
}
</style>
