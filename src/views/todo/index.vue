<template>
  <div class="box">
    <!-- 左侧栏 -->
    <div class="left">
      <Left></Left>
    </div>
    <!-- 右侧内容 -->
    <div class="right" :style="page == 'important' ? 'background: #ffe4e9' : ''">
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Left from "./components/Left";
import Right from "./components/Right";
import handle from "./components/handle";
export default {
  components: {
    Left,
    Right,
  },
  mounted() {
    handle.$on("choose", (res) => {
      console.log(res);
      this.page = res.value;
    });
  },
  data() {
    return {
      page: "",
      dRight: {
        background: "#ffe4e9",
      },
    };
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
    min-height: 500px;
  }
  .left {
    width: 350px;
    background: #f4f4f4;
    border-radius: 10px 0 0 10px;
  }
  .right {
    flex: 1;
    border-radius: 0 10px 10px 0;
    background: #dfedf9;
  }
}
</style>
