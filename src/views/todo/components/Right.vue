<template>
  <div>
    <myDay v-show="title == 'myDay'" ref="myDay"></myDay>
    <star v-show="title == 'important'" ref="important"></star>
  </div>
</template>

<script>
import myDay from "./MyDay.vue";
import star from "./Star.vue";
import handle from "./handle";
export default {
  components: {
    myDay,
    star,
  },
  data() {
    return {
      title: "myDay",
    };
  },
  mounted() {
    handle.$on("choose", (res) => {
      this.title = res.value;
      this.$nextTick(() => {
        if (res.value == "myDay") this.$refs.myDay.getItem();
        if (res.value == "important") this.$refs.important.getItem();
      });
    });
  },
};
</script>

<style></style>
