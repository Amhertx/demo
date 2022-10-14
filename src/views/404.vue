<template>
  <div class="bg">
    <div class="title">404</div>
    <div class="content">
      This is not what you want, but we are very serious. l just want to tell you in a specialway that the page you visited does not exist or the file is
      invalid.You can contact thewebmaster to solve your problem faster, or return to the homepage of the website tobrowse other pages. The homepage address
      link of the website is: https://404.life
    </div>
    <el-button class="btn" @click="$router.push({ path: '/' })">返回首页</el-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    border-radius: 10px;
    padding: 0 10px;
    width: max-content;
    background: red;
    color: #fff;
    font-size: 100px;
  }
  .content {
    margin-top: 20px;
    width: 800px;
    font-size: 20px;
    color: #fff;
  }
  .btn {
    margin-top: 20px;
    background: #f7971d;
    border: #f7971d;
    color: black;
    font-size: 30px;
    font-weight: bold;
  }
  .btn:hover {
    background: #ffaf46;
  }
}
</style>
