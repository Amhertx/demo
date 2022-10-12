<template>
  <div class="box">
    <!-- 左侧栏 -->
    <div class="left">
      <Left></Left>
    </div>
    <!-- 右侧内容 -->
    <div class="right">
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Left from "./components/Left";
import Right from "./components/Right";
export default {
  components: {
    Left,
    Right,
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  padding: 20px;
  .left,
  .right {
    border: 1px solid;
    height: 90vh;
  }
  .left {
    width: 400px;
  }
  .right {
    width: 1000px;
  }
}
</style>
