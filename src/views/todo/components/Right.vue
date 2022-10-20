<template>
  <div>
    <myDay v-show="title == 'myDay'" ref="myDay"></myDay>
    <star v-show="title == 'important'" ref="important"></star>
    <project v-show="title == 'project'" ref="project"></project>
  </div>
</template>

<script>
import myDay from "./MyDay.vue";
import star from "./Star.vue";
import project from "./Project.vue";
import handle from "./handle";
export default {
  components: {
    myDay,
    star,
    project,
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
        if (res.value == "project") this.$refs.project.getItem();
      });
    });
  },
};
</script>

<style></style>
