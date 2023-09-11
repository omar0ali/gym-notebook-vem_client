<template>
  <footer>
   <p> {{ footerText }} </p>
   <p class="span">Developed by <a href="https://omar0ali.github.io/portfolio">Omar BaGunaid</a></p>
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
a {
    color: white;
}
p {
    color: white;
    font-size: 15px;
    font-weight: 600;
}
.span {
    font-size: 13px;
    font-weight: 100;
    color: white;
}
footer {
    bottom: 0;
    margin: -10px;
    position: fixed;
    width: 100%;
    background-color: rgb(76, 92, 118);
    padding: 10px;
    text-align: center;
    font-weight: 900;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
</style>