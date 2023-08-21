<template>
  <footer>
   <p> {{ footerText }} </p>
  </footer>
</template>

<script>
export default {
    data() {
        return {
            footerText: "Copyright © 2023 Gym Notebook. All rights reserved." //add copyright symbol
        }
    }
}
</script>

<style scoped>
p {
    color: white;
}
footer {
    background-color: rgb(76, 92, 118);
    padding: 10px;
    text-align: center;
    height: auto;
    font-weight: 900;
}
</style>