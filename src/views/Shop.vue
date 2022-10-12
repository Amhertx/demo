<template>
  <div>
    <div v-for="(item, index) in shop" :key="index">
      <button @click="del(item)">-</button>
      {{ item.label }} ￥{{ item.price }} {{ item.num }} 个
      <button @click="clickAdd(item)">+</button>
    </div>
    购物车总数：{{ car }} 件 共{{ this.price }}元
    <button @click="clear()">清空</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shop: [
        { label: "衣服", value: "1", price: 20, num: 0 },
        { label: "食物", value: "2", price: 40, num: 0 },
        { label: "玩具", value: "3", price: 30, num: 0 },
        { label: "文具", value: "4", price: 20, num: 0 },
      ],
      car: 0,
      many: {},
      price: 0,
    };
  },
  methods: {
    clickAdd(e) {
      if (e.num == 0) {
        this.car += 1;
      }
      this.price += e.price;
      e.num++;
    },
    del(e) {
      if (e.num > 0) {
        if (e.num == 1) this.car--;
        this.price -= e.price;
        e.num--;
      }
    },
    clear() {
      this.shop.map((item) => (item.num = 0));
      this.car = 0;
      this.price = 0;
    },
  },
};
</script>

<style></style>
