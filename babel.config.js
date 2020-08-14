module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    // vant 组件按需引入，配置按需引入后，将不允许直接导入所有组件，包括 cdn 的全部导入
    // 使用 cdn 时关闭按需引入，使用本地打包时开启按需引入
    // [
    //   'import',
    //   {
    //     libraryName: 'vant',
    //     libraryDirectory: 'es',
    //     style: true,
    //   },
    //   'vant',
    // ],
  ],
}
