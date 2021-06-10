<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    document.title = "Karelu"
  }
}
</script>

<style>
  @import "../static/font/font.css";
</style>