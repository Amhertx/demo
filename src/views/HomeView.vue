<template>
  <div class="home">
    <!-- <router-link to="/shop">shop | </router-link>
    <router-link to="/todo">todoList | </router-link>
    <router-link to="/shop">shop | </router-link>
    <router-link to="/shop">shop | </router-link> -->
    <div class="btn" v-for="(item, index) in clickList" :key="index" @click="go(item)">
      {{ item.label }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      clickList: [
        { label: "shop", router: "/shop" },
        { label: "todoList", router: "/todo" },
        { label: "weather", router: "/weather" },
        { label: "bill", router: "/bill" },
        { label: "...", router: "" },
      ],
    };
  },
  methods: {
    go(item) {
      this.$router.push({ path: item.router });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #e6e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    border: 1px solid #f7b548;
    background: #f7b548;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    user-select: none;
    margin: 0 10px;
  }
  .btn:hover {
    background: #f9c675;
  }
}
</style>
