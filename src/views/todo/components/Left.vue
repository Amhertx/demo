<template>
  <div class="box-left">
    <div class="top">
      <div class="title">
        <div class="info">
          <div class="img">
            <img v-show="userInfo.img" src="" alt="" />
            <div v-show="!userInfo.img">
              <h5 class="img">A</h5>
            </div>
          </div>
          <div class="content">
            <h3 class="name">{{ "Amhertx" }}</h3>
            <span class="account">
              <span>49******@qq.com</span>
              <i class="el-icon-d-caret"></i>
            </span>
          </div>
        </div>
        <div class="search">
          <el-input size="small" placeholder="搜索">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="list-row" v-for="(item, index) in list" :key="index" @click="choosePage(item)">
        <div :class="item.icon"></div>
        <div class="list-row-content">{{ item.label }}</div>
        <div class="tips" v-show="item.todoInfo">{{ item.todoInfo }}</div>
      </div>
    </div>
    <hr />
    <div class="free-list">
      <div class="free-list-row" v-for="(item, index) in userList" :key="index">
        <i class="el-icon-s-order"></i>
        <div class="content" v-show="!item.show">{{ item.label }}</div>
        <el-input
          class="content"
          v-model="item.label"
          ref="focus"
          @focus="getAll"
          @blur="setName(item)"
          size="small"
          @keydown.enter.native="subProject(item)"
          v-show="item.show"
        ></el-input>
      </div>
    </div>
    <div class="add-bottom" @click="add()">
      <i class="el-icon-plus"></i>
      新建列表
    </div>
  </div>
</template>

<script>
import handle from "./handle";
export default {
  data() {
    return {
      list: [
        { label: "我的一天", value: "myDay", icon: "el-icon-sunny", todoInfo: "" },
        { label: "重要", value: "important", icon: "el-icon-star-off", todoInfo: "" },
        { label: "计划内", value: "plan", icon: "el-icon-notebook-1", todoInfo: "" },
        { label: "已分配给我", value: "4", icon: "el-icon-user", todoInfo: "" },
        { label: "任务", value: "5", icon: "el-icon-s-home", todoInfo: "" },
      ],
      userInfo: {},
      userList: [],
    };
  },
  mounted() {
    this.getTips();
    handle.$on("update", () => {
      this.getTips();
    });
  },
  methods: {
    getTips() {
      this.list.map((res) => {
        const a = JSON.parse(window.localStorage.getItem(res.value));
        if (a) {
          if (res.value == "myDay") {
            res.todoInfo = a.myTodoList.length + a.oldList.length;
          }
          if (res.value == "important") {
            res.todoInfo = a.starList.length;
          }
        }
      });
    },
    add() {
      this.userList.push({ label: "无标题列表", value: this.userList.length, show: true });
      this.$nextTick(() => {
        this.$refs.focus[this.userList.length - 1].focus();
      });
    },
    choosePage(item) {
      handle.$emit("choose", item);
    },
    subProject(item) {
      item.show = false;
    },
    getAll(event) {
      event.currentTarget.select();
    },
    setName(item) {
      item.show = false;
      if (item.label.trim() == false) item.label = "无标题列表";
    },
  },
};
</script>

<style lang="scss" scoped>
.box-left {
  padding: 20px;
  position: relative;
  height: 85vh;
  .top {
    .title {
      .info {
        height: 80px;
        display: flex;
        align-items: center;
        .img {
          font-size: 50px;
          color: #fff;
          margin: 0 10px 0 0;
          width: 80px;
          height: 80px;
          line-height: 80px;
          text-align: center;
          border-radius: 50%;
          background: #6ba5e7;
          user-select: none;
        }
        .content {
          text-align: left;
          .name {
            margin: 0;
          }
          .account {
            color: #606060;
            font-size: 10px;
          }
        }
      }
      .search {
        margin-top: 10px;
      }
    }
  }
  .list {
    margin-top: 20px;
    .list-row {
      cursor: pointer;
      user-select: none;
      display: flex;
      padding: 10px;
      align-items: center;
      .list-row-content {
        font-size: 15px;
        margin-left: 10px;
        flex: 1;
        text-align: left;
      }
      .tips {
        color: #fff;
        font-size: 15px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background: #606060;
      }
    }
    .list-row:hover {
      background: #e9e9e9;
    }
  }
  .free-list {
    overflow: auto;
    height: 40vh;
    .free-list-row {
      display: flex;
      padding: 10px;
      align-items: center;
      .content {
        margin-left: 10px;
        font-size: 15px;
      }
    }
    .free-list-row:hover {
      background: #e9e9e9;
    }
  } // 滚动条
  .free-list::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .free-list::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: #e5e5e5;
  }
  .free-list::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 10px;
    background: #ffffff;
  }
  .add-bottom {
    cursor: pointer;
    user-select: none;
    position: absolute;
    bottom: 20px;
  }
}
</style>
