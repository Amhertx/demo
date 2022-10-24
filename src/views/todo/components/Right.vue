<template>
  <div>
    <myDay v-show="title == 'myDay'" ref="myDay"></myDay>
    <star v-show="title == 'important'" ref="important"></star>
    <project v-show="title == 'project'" ref="project"></project>
    <search v-show="search"></search>
    <inConstruction v-show="title == 'plan' || title == 'allocation'"></inConstruction>
  </div>
</template>

<script>
import myDay from "./MyDay.vue";
import star from "./Star.vue";
import project from "./Project.vue";
import search from "./Search.vue";
import inConstruction from "./InConstruction.vue";
import handle from "./handle";
export default {
  components: {
    myDay,
    star,
    project,
    search,
    inConstruction,
  },
  data() {
    return {
      title: "myDay",
      search: 0,
      oldTitle: "",
    };
  },
  mounted() {
    handle.$on("choose", (res) => {
      this.search = res.search;
      if (res.search) {
        if (this.title) this.oldTitle = this.title;
        this.title = "";
      } else {
        if (res.value) {
          this.title = res.value;
          this.$nextTick(() => {
            if (res.value == "myDay") this.$refs.myDay.getItem();
            if (res.value == "important") this.$refs.important.getItem();
            if (res.value == "project") this.$refs.project.getItem();
          });
        } else {
          // setTimeout(() => {
          this.title = this.oldTitle;
          // }, 500);
        }
      }
    });
  },
};
</script>

<style></style>
