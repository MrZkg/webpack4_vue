<template>
  <div class="content">
    <div class="title">{{env}}</div>
    <P><span>上线域名、地址:</span> {{config.BAR_API}}</P>
    <P><span>api变量:</span> {{config.BAZ_API}}</P>
    <P><span>api变量:</span> {{config.DOMAIN}}</P>
    <P><span>api变量:</span> {{config.FOO_API}}</P>
    <img src="../../assets/logo.png" alt="">
    <img :src="img1" alt="">
  </div>
</template>

<script>
import img1 from '../../assets/logo.png'
export default {
  name: 'index',
  data () {
    return {
      msg: '',
      env: process.env.NODE_ENV,
      img1: img1,
      config: API_CONFIG
    }
  },
  created(){
    console.log(API_CONFIG);
    console.log(process.env.NODE_ENV);
  //   if(process.env.NODE_ENV === 'development'){ 
  //     //开发环境 do something
  //     this.msg= 'development'
  //   }else if(process.env.NODE_ENV === 'production') {
  //     //生产环境 do something
  //     this.msg= 'production'
  //   }

  }
}
</script>

<style lang="scss" scoped >
  .title{
    width: 100%;
    height:90px;
    text-align: center;
    background-color:hotpink;
    line-height: 90px;
    color: #fff;
    font-size: 48px;
  }
  span{
    color:green;
  }
</style>
