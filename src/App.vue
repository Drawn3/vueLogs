<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import MainPage from '@/views/MainPage.vue'

export default {
  components: {
    MainPage
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
html, body{
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
*:focus{
  outline: none  !important;
}
</style>
