<template>
  <div>
    <h1>这里是返回结果</h1>
    <div>
      <!-- 这里已经完成了双向绑定 -->
      <!-- 用户输入的page与num，可以通过send方法传递HTTP请求 -->
      <label>
        <span>页码：</span>
        <input v-enter-number type="text" v-model="page" />
      </label>
      <label>
        <span>数量：</span>
        <input type="text" v-model="num" />
      </label>
      <!-- 这里有事件的绑定 -->
      <button type="button" @click="send()">提交</button>
    </div>
    <!-- 通过JSON.stringify格式化显示 -->
    <pre v-html="JSON.stringify(items, null, 2)"></pre>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      page: 1,
      num: 10,
      // 这里是数据体
      items: []
    };
  },
  methods: {
    send () {
      // 使用axios作为http客户端，发送HTTP的GET请求
      // 传递参数num和page
      axios.request({
        url: 'http://your.domain.com/lists',
        params: {
          'page': this.page,
          'num': this.num
        },
        method: 'GET'
      })
    .then(res => (this.items = res.data.data));
    }
  },
  // 定义指令只允许输入正整数
  directives: {
    enterNumber: {
      inserted: function (el) {
        el.addEventListener("keypress",function(e){
          e = e || window.event;
          let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
          let re = /\d/;
          if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
            if(e.preventDefault){
              e.preventDefault();
            }else{
              e.returnValue = false;
            }
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
