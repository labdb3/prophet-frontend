<template>
    <div>
    <button @click="clustering">重新计算</button>
    <p></p>
    <p></p>
        <img class="p" src="http://127.0.0.1:8000/static/clustering.jpeg">
    </div>
</template>
<script>
import service from '../utils/request';

export default {
    data(){
        var body = null;
        return {body}
  },
  methods: {
    clustering() {
        service.get("clustering").then(
      (response) => {
        window.alert("大约需要几分钟才可以看到结果的更新")
      }
    )
      }
    }
}
 
</script>
<style>
.p{
  width: 1000px;  
  height: 700px;
  border: 1px solid #aaa;
  background: url('图片地址') no-repeat center;
}
</style>