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
  border-radius: 10px;
  .left,
  .right {
    height: 90vh;
  }
  .left {
    width: 350px;
    background: #f4f4f4;
    border-radius: 10px 0 0 10px;
  }
  .right {
    flex: 1;
    border-radius: 0 10px 10px 0 ;
    background: #dfedf9;
  }
}
</style>
