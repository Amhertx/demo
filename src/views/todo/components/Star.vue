<template>
  <div class="box-right">
    <h2 class="title">
      <div>
        <i class="el-icon-star-off"></i>
        重要
      </div>
    </h2>
    <div class="body">
      <div class="loading" v-if="!starList.length">
        <i class="el-icon-sunny logo"></i>
        <div class="loading-content">尝试为一些任务添加星标，以便在此处查看它们。</div>
      </div>
      <ul class="todo-list">
        <li class="list-li" v-for="(item, index) in starList" :key="index">
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
            <el-button class="btn" size="mini" type="danger" @click="del(item)">删除</el-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="ctodo">
      <el-tooltip class="item" effect="dark" manual v-model="isTodo" content="还没输入任务呢！" placement="top">
        <el-input
          maxlength="255"
          v-model="form.content"
          placeholder="添加任务"
          @keydown.enter.native="addTodo"
        ></el-input>
      </el-tooltip>
    </div>
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
      starList: [],
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    // 输入任务
    addTodo() {
      if (this.form.content) {
        this.myTodoList.push({ id: this.myTodoList.length, content: this.form.content, do: false, star: true });
        this.setItem();
      } else {
        this.isTodo = true;
        setTimeout(() => {
          this.isTodo = false;
        }, 1500);
      }
      this.form.content = "";
    },
    del(item) {
      this.myTodoList.map((res, i) => {
        if (res.id == item.id) {
          this.myTodoList.splice(i, 1);
        }
      });
      this.setItem();
    },
    star(item) {
      this.myTodoList.map((res) => {
        if (res.id == item.id) {
          res.star = !res.star;
        }
      });
      this.setItem();
    },
    getItem() {
      const myDay = JSON.parse(window.localStorage.getItem("myDay"));
      if (myDay) {
        this.myTodoList = myDay.myTodoList;
        this.oldList = myDay.oldList;
      } else {
        this.myTodoList = [];
        this.oldList = [];
        this.setItem();
      }
      const a = JSON.parse(window.localStorage.getItem("important"));
      if (a) {
        this.starList = a.starList;
      } else {
        this.starList = [];
        this.setItem();
      }
    },
    setItem() {
      let a = { myTodoList: this.myTodoList, oldList: this.oldList };
      let starList = [];
      this.myTodoList.map((res) => {
        if (res.star) {
          starList.push(res);
        }
      });
      window.localStorage.setItem("myDay", JSON.stringify(a));
      window.localStorage.setItem("important", JSON.stringify({ starList }));
      handle.$emit("update");
      this.getItem();
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
    color: #ac395d;
    font-size: 35px;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  .time {
    color: #ac395d;
    text-align: left;
    margin-bottom: 20px;
  }
  .body {
    height: 60vh;
    overflow: auto;
    .hr {
      cursor: pointer;
      user-select: none;
      background: #f5fafd;
      color: #ac395d;
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
      .loading-content {
        font-size: 15px;
        color: #ac395d;
        margin-top: 10px;
        width: 250px;
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
