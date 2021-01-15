<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <div class="flex">
    <div>
      <van-button type="default">default</van-button>
      <van-button type="primary">primary</van-button>
      <van-button type="success">success</van-button>
      <van-button type="info">info</van-button>
      <van-button type="warning">warning</van-button>
      <van-button type="danger">danger</van-button>
    </div>

    <div>
      <el-button>default</el-button>
      <el-button type="primary">primary</el-button>
      <el-button type="success">success</el-button>
      <el-button type="info">info</el-button>
      <el-button type="warning">warning</el-button>
      <el-button type="danger">danger</el-button>
    </div>

    <div>
      <a-tag color="pink"> pink </a-tag>
      <a-tag color="red"> red </a-tag>
      <a-tag color="orange"> orange </a-tag>
      <a-tag color="green"> green </a-tag>
      <a-tag color="cyan"> cyan </a-tag>
      <a-tag color="blue"> blue </a-tag>
      <a-tag color="purple"> purple </a-tag>
      <a-badge count="5">
        <a href="#" class="head-example" />
      </a-badge>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import { ElButton } from 'element-plus';
import { Tag } from 'ant-design-vue';

import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'PageHome',
  components: {
    [Button.name]: Button,
    [ElButton.name]: ElButton,
    [Tag.name]: Tag,
    HelloWorld,
  },
  setup() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.flex {
  display: flex;
  flex-direction: column;
}

.flex > div {
  margin-top: 20px;
}
</style>
