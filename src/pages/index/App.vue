<template>
  <div id="app">
    <keep-alive :max="15">
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  height: 100%;
  min-height: 100%;
  // 路由级别的根元素
  > div[class^="view-"] {
    height: 100%;
    min-height: 100%;
  }
}
</style>
