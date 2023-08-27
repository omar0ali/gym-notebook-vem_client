<template>
  <div v-show="title.length!=0">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
};
</script>

<style scoped>
div {
  left: 0;
  right: 0;
  height: 25px;
  padding: 10px;
  position: fixed;
  background-color: rgb(68, 101, 101);
  margin-top:67px;
}
span {
  font-size: 18px;
  color: white;
  font-weight: 800;
}
</style>