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
      <div class="list-row" v-for="(item, index) in list" :key="index">
        <div :class="item.icon"></div>
        <div class="list-row-content">{{ item.label }}</div>
      </div>
    </div>
    <hr />
    <div class="free-list" v-for="(item, index) in userList" :key="index">
      <i class="el-icon-s-order"></i>
      <div>{{ item.label }}</div>
    </div>
    <div class="add-bottom" @click="add()">
      <i class="el-icon-plus"></i>
      新建列表
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { label: "我的一天", value: "1", icon: "el-icon-sunny" },
        { label: "重要", value: "2", icon: "el-icon-star-off" },
        { label: "计划内", value: "3", icon: "el-icon-notebook-1" },
        { label: "已分配给我", value: "4", icon: "el-icon-user" },
        { label: "任务", value: "5", icon: "el-icon-s-home" },
      ],
      userInfo: {},
      userList: [],
    };
  },
  methods: {
    add() {
      this.userList.push({ label: "无标题列表", value: this.userList.length });
    },
  },
};
</script>

<style lang="scss" scoped>
.box-left {
  padding: 20px;
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
      }
    }
    .list-row:hover {
      background: #e9e9e9;
    }
  }
  .free-list {
    display: flex;
    padding: 10px;
    align-items: center;
  }
  .free-list:hover {
    background: #e9e9e9;
  }
  .add-bottom {
    cursor: pointer;
    user-select: none;
    position: absolute;
    bottom: 100px;
  }
}
</style>
