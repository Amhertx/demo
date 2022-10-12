<template>
  <div>
    <div>我的一天</div>
    <div>
      <div v-for="(item, index) in myTodoList" :key="index">
        {{ item }}
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myTodoList: [],
    };
  },
};
</script>

<style scoped></style>
