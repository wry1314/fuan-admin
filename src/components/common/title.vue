<template>
    <div class="title-box">
      <h1>{{titleText}}</h1>
    </div>
</template>

<script>
    export default {
      name: "titleH1",
      props:{
        titleText:{
          type:String,
          default:''
        }
      }
    }
</script>

<style scoped>
.title-box{
  padding-left: 20px;
  border-bottom: 1px solid #dedede;
  height: 60px;
}
h1{
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  line-height: 60px;
}
</style>
