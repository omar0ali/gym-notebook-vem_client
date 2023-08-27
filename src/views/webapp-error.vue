<template>
  <div v-show="error.length != 0" class="error">
    {{ error }}
  </div>
</template>

<script>
export default {
  props: ["error"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.error {
  font-size: 18px;
  position: fixed;
  padding: 20px;
  height: auto;
  width: 25%;
  bottom: 10%;
  border-radius: 10px;
  color: #460000;
  background-color: rgba(183, 1, 1, 0.662);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>