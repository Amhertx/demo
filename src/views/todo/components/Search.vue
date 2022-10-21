<template>
  <div class="box-right">
    <transition name="el-zoom-in-top">
      <div class="body" v-show="show">
        <div class="loading" v-if="!myTodoList.length && !oldList.length">
          <!-- <i class="el-icon-sunny logo"></i> -->
          <img src="@/assets/where.png" alt="" />
          <div class="loading-content">已进行深度搜索，但找不到你当前查找的内容。</div>
        </div>
        <ul class="todo-list">
          <li class="list-li" v-for="(item, index) in myTodoList" :key="index">
            <div class="li-div">
              <el-checkbox v-model="item.do" @change="clickCheckbox(item, true)"></el-checkbox>
              <div class="content">
                {{ item.content }}
              </div>
              <el-button
                :type="item.star ? 'warning' : 'info'"
                :icon="item.star ? 'el-icon-star-on' : 'el-icon-star-off'"
                circle
                size="mini"
                @click="star(item)"
              ></el-button>
              <el-button class="btn" size="mini" type="danger" @click="del('n', index)">删除</el-button>
            </div>
          </li>
        </ul>
        <div class="hr" @click="showOldList = !showOldList" v-show="oldList.length">
          <i :class="showOldList ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
          已完成
        </div>
        <transition name="el-zoom-in-top">
          <ul class="todo-list" v-show="showOldList">
            <li class="list-li" v-for="(item, index) in oldList" :key="index">
              <div class="li-div">
                <el-checkbox v-model="item.do" @change="clickCheckbox(item, false)"></el-checkbox>
                <div class="content old">
                  {{ item.content }}
                </div>
                <el-button
                  :type="item.star ? 'warning' : 'info'"
                  :icon="item.star ? 'el-icon-star-on' : 'el-icon-star-off'"
                  circle
                  size="mini"
                  @click="star(item)"
                ></el-button>
                <el-button class="btn" size="mini" type="danger" @click="del('o', index)">删除</el-button>
              </div>
            </li>
          </ul>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import handle from "./handle";
export default {
  data() {
    return {
      myTodoList: [],
      oldList: [],
      showOldList: true,
      form: {
        content: "",
      },
      date: "",
      time: "",
      checkList: [],
      isTodo: false,
      show: false,
    };
  },
  mounted() {
    handle.$on("choose", (res) => {
      if (res.search) {
        setTimeout(() => {
          this.getItem();
          this.show = true;
        }, 300);
      }
      if (!res.search) this.show = false;
    });
  },
  methods: {
    del(name, index) {
      if (name == "n") {
        this.myTodoList.splice(index, 1);
      } else {
        this.oldList.splice(index, 1);
      }
      this.setItem();
    },
    star(item) {
      item.star = !item.star;
      this.setItem();
    },
    getItem() {
      this.myTodoList = [];
      this.oldList = [];
      const a = JSON.parse(window.localStorage.getItem("search"));
      a?.map((res) => {
        if (res.do) {
          this.oldList.push(res);
        } else {
          this.myTodoList.push(res);
        }
      });
    },
    findItem() {
      let myTodoList = JSON.parse(window.localStorage.getItem("myDay")).myTodoList;
      let oldList = JSON.parse(window.localStorage.getItem("myDay")).oldList;
      this.oldList.map((item) => {
        oldList.map((i) => {
          if (item.id == i.id) i.star = item.star;
        });
        myTodoList.map((res, index) => {
          if (res.id == item.id) {
            res.star = item.star;
            oldList.push(item);
            myTodoList.splice(index, 1);
          }
        });
      });
      this.myTodoList.map((item) => {
        myTodoList.map((i) => {
          if (item.id == i.id) i.star = item.star;
        });
        oldList.map((res, index) => {
          if (res.id == item.id) {
            res.star = item.star;
            myTodoList.push(item);
            oldList.splice(index, 1);
          }
        });
      });
      return { myTodoList, oldList };
    },
    setItem() {
      let a = this.findItem();
      let starList = [];
      this.myTodoList.map((res) => {
        if (res.star) {
          starList.push(res);
        }
      });
      window.localStorage.setItem("myDay", JSON.stringify(a));
      window.localStorage.setItem("important", JSON.stringify({ starList }));
      handle.$emit("update");
    },
    // 完成任务
    clickCheckbox(item, doIt) {
      if (doIt) {
        item.do = true;
        this.move(this.myTodoList, this.oldList, item);
      } else {
        item.do = false;
        this.move(this.oldList, this.myTodoList, item);
      }
      this.setItem();
    },
    // 完成后移动任务到下面
    move(list, list2, item) {
      let a = list;
      a.map((e, index) => {
        if (e.id == item.id) {
          a.splice(index, 1);
        }
      });
      list2.push(item);
      return a;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-right {
  height: 80vh;
  padding: 50px;
  position: relative;
  .title {
    color: #3063ab;
    font-size: 35px;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  .time {
    color: #3063ab;
    text-align: left;
    margin-bottom: 20px;
  }
  .body {
    margin-top: 60px;
    height: 60vh;
    overflow: auto;
    .hr {
      cursor: pointer;
      user-select: none;
      background: #f5fafd;
      color: #3063ab;
      width: max-content;
      padding: 5px;
      // margin-left: 20px;
      margin: 10px 0 15px;
      border-radius: 10px;
    }
    .hr:hover {
      background: #fff;
    }
    .todo-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0;
      padding: 0;
      list-style: none;
      .list-li {
        min-height: 50px;
        line-height: 50px;
        width: 100%;
        border-radius: 10px;
        text-align: left;
        background: #f4f5f6;
        margin-bottom: 5px;
        .li-div {
          padding: 0 20px;
          display: flex;
          align-items: center;
          .content {
            margin-left: 20px;
            display: inline;
            flex: 1;
            word-break: break-all;
            padding: 10px 20px 10px 0;
            line-height: 25px;
          }
          .old {
            text-decoration: line-through;
            color: #909399;
          }
          .btn {
            height: 30px;
          }
        }
      }
      .list-li:hover {
        background: #f6f6f6;
      }
    }
    .loading {
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .logo {
        font-size: 150px;
        color: #f7b548;
        animation: logo 10s infinite linear;
      }
      @keyframes logo {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .loading-title {
        margin-top: 10px;
        font-weight: bold;
        color: #3063ab;
        font-size: 20px;
      }
      .loading-content {
        margin-top: 10px;
        font-size: 15px;
        color: #4170b2;
        width: 280px;
      }
    }
  }
  // 滚动条
  .body::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .body::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: #e5e5e5;
  }
  .body::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 10px;
    background: #ffffff;
  }
  .ctodo {
    position: absolute;
    bottom: 20px;
    width: 500px;
  }
}
</style>
