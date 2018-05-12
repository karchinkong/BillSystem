<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  /*滚动条样式*/
  ::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 50px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(45,140,240,0.2);
  }
  ::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 50px;
    background: rgba(45,140,240,0.1);
  }
</style>

