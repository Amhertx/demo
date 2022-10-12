<template>
  <div>
    <div>
      <div>
        <div>头像</div>
        <div>账户</div>
      </div>
    </div>
    <div>固定列表</div>
    <div v-for="(item, index) in 3" :key="index">自定义列表</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
