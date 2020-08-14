module.exports = config => {
  const vue = {
    name: 'vue',
    test: /[\\/]vue[\\/]/u,
    priority: 10,
    chunks: 'all',
    enforceSizeThreshold: 1,
  }
  const vueRouter = {
    name: 'vue-router',
    test: /[\\/]vue-router[\\/]/u,
    priority: 10,
    chunks: 'all',
    enforceSizeThreshold: 1,
  }
  const vuex = {
    name: 'vuex',
    test: /[\\/]vuex[\\/]/u,
    priority: 10,
    chunks: 'all',
    minSize: 1,
    minChunks: 1,
    enforceSizeThreshold: 1,
  }
  // 取出默认值，合并
  const defaultCacheGroups = config.optimization.splitChunks.cacheGroups
  config.optimization.splitChunks.cacheGroups = {
    ...defaultCacheGroups,
    vue,
    vueRouter,
    vuex,
  }
}
