<template>
  <div class="box-right">
    <h2 class="title">我的一天</h2>
    <div class="time">{{ date }}</div>
    <div>
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
              @click="item.star = !item.star"
            ></el-button>
            <el-button class="btn" size="mini" type="danger" @click="myTodoList.splice(index, 1)">删除</el-button>
          </div>
        </li>
      </ul>
      <!-- <hr v-show="myTodoList.length && oldList.length" /> -->
      <div class="hr" @click="showOldList = !showOldList" v-show="oldList.length">
        <i :class="showOldList ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
        已完成
      </div>
      <transition name="el-zoom-in-top">
        <ul class="todo-list" v-show="showOldList">
          <li class="list-li" v-for="(item, index) in oldList" :key="index">
            <div class="li-div">
              <el-checkbox v-model="item.do" @change="clickCheckbox(item, false)"></el-checkbox>
              <div class="content">
                {{ item.content }}
              </div>
              <el-button
                :type="item.star ? 'warning' : 'info'"
                :icon="item.star ? 'el-icon-star-on' : 'el-icon-star-off'"
                circle
                size="mini"
                @click="item.star = !item.star"
              ></el-button>
              <el-button class="btn" size="mini" type="danger" @click="oldList.splice(index, 1)">删除</el-button>
            </div>
          </li>
        </ul>
      </transition>
      <div class="ctodo">
        <el-tooltip class="item" effect="dark" manual v-model="isTodo" content="还没输入任务呢！" placement="top">
          <el-input v-model="form.content" placeholder="添加任务" @keydown.enter.native="addTodo"></el-input>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
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
      checkList: [],
      isTodo: false,
    };
  },
  mounted() {
    const date = new Date();
    this.date =
      date.getMonth() +
      1 +
      "月" +
      date.getDate() +
      "日，星期" +
      (date.getDay() == 1
        ? "一"
        : date.getDay() == 2
        ? "二"
        : date.getDay() == 3
        ? "三"
        : date.getDay() == 4
        ? "四"
        : date.getDay() == 5
        ? "五"
        : date.getDay() == 6
        ? "六"
        : "日");
  },
  methods: {
    check(item) {
      console.log(item);
    },
    // 输入任务
    addTodo() {
      if (this.form.content) {
        this.myTodoList.push({ id: this.myTodoList.length, content: this.form.content, do: false, star: false });
      } else {
        this.isTodo = true;
        setTimeout(() => {
          this.isTodo = false;
        }, 1500);
      }
      this.form.content = "";
    },
    // 完成任务
    clickCheckbox(item, doIt) {
      console.log("-------", item);
      if (doIt) {
        item.do = true;
        this.move(this.myTodoList, this.oldList, item);
      } else {
        item.do = false;
        this.move(this.oldList, this.myTodoList, item);
      }
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
  padding: 50px;
  .title {
    color: #3063ab;
    font-size: 35px;
    margin-top: 0;
    margin-bottom: 5px;
    text-align: left;
  }
  .time {
    color: #3063ab;
    text-align: left;
  }
  .hr {
    cursor: pointer;
    user-select: none;
    background: #f5fafd;
    color: #3063ab;
    width: max-content;
    padding: 5px;
    margin-left: 20px;
    border-radius: 10px;
  }
  .hr:hover {
    background: #fff;
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px;
    padding: 0;
    list-style: none;
    .list-li {
      height: 50px;
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
  .ctodo {
    position: absolute;
    bottom: 100px;
    width: 500px;
  }
}
</style>
