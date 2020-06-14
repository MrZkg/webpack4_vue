<template>
  <div class="content">
    <h1>my</h1>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'my',
  data () {
    return {
      user: 'zkg',
      age: 15,
      info:{
        sex:'男',
        weight: 120
      }
    }
  },
  mounted(){
    this.getInfo();
  },
  components:{
    HelloWorld
  },
  methods:{
    // getInfo(){
    //   const res = axios.get('/ele/lala')
    //   .then(({data})=>{
    //     console.log(data);
    //   })
    // }
    async getInfo(){
      const res = await axios.get('/api/getInfo');
      console.log(res.data);
    }
  }
}
</script>

<style lang='scss' scoped>
h1{
  font-size: 37.5px;
}
</style>
