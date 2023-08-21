<template>
  <div>
    <header>
      <h1>{{ title }}</h1>
    </header>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: "Gym Notebook",
    };
  },
  components: {
    
  }
};
</script>

<style scoped>
header {
  padding: 7px;
  height: 50px;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(76, 92, 118);
}
</style>