<template>
  <div class="body">
    <img class="img" src="@/assets/inConstruction.png" alt="" />
    <h2 class="content">当前页面正在建设中...</h2>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.body {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 15vw;
  }
  .content {
    color: #4170b2;
  }
}
</style>
