const glob = require('glob')

// 环境变量获取
const { npm_config_argv } = process.env

// 获取 npm 配置参数，npm_config_argv 对象
// {"remain":[],"cooked":["run","build","--page-index"],"original":["run","build","--page-index"]}
const originalList = JSON.parse(npm_config_argv || '{}').original || []

// 获取以 --page- 开头的指定页面参数，此参数指定要运行的页面(src/pages/xxx)
const runPageParam = originalList.find(item => item.startsWith('--page-'))

// 如果存在指定页面参数
// 去掉 --page- 则为要运行的页面的目录名xxx (src/pages/xxx)
const runPage = runPageParam && runPageParam.replace('--page-', '')

// 通过 glob 匹配获取多页路径方法
const getPages = globPath => {

  // 所有页面目录名路径
  // glob.sync(globPath) 返回匹配到的路径组成的数组，例如：['src/pages/index', 'src/pages/admin']
  const pagePathList = glob.sync(globPath)

  // 根据路径，获取所有页面目录名称列表（路径的最后一项）
  const pageNameList = pagePathList.map(pagePath => pagePath.split('/').slice(-1)[0])
  // 判断所有页面目录中是否包括指定运行的页面名称
  const isRunPageExists = pageNameList.includes(runPage)

  // 声明一个存放页面入口对象的容器对象
  const pages = {}

  // 遍历所有页面目录名称的列表，生成 pages 入口配置对象
  pageNameList.forEach(pageName => {
    // 如果有指定运行页面，且指定运行页面存在，且此次循环不是指定页面
    if (runPage && isRunPageExists && pageName !== runPage) {
      // 生产模式直接返回忽略此次循环页面
      // if (isProduction) {
      //   return
      // }
      // // 开发模式除了
      // if (pageName !== 'index') {
      //   return
      // }
      return
    }
    // pages 的 key 值，如果使用目录结构。生成的静态资源，就会按这个目录存放。
    // 比如可以使用 pages[`../${pageName}/js/${pageName}`] = {}
    // 同时会影响引入路径，打包的 css 等静态资源也会被放入这个目录。
    // 注意，不是 chunks 的值决定了静态资源的存放目录，是 pages 的 key 。
    pages[`${pageName}`] = {
      entry: `src/pages/${pageName}/main.js`,
      template: `src/pages/${pageName}/index.html`,
      // 除首页外的页面单独放置于文件夹内
      // filename: pageName === 'index' ? 'index.html' : `${pageName}/index.html`,
      filename: `${pageName}.html`,
      title: '',
      // chunks: ['chunk-vendors', 'chunk-common', pageName]
    }
  })
  return pages
}

module.exports = getPages

// pages: {
//   index: {
//     // page 的入口
//     entry: 'src/main.js',
//     // 模板来源
//     template: 'public/index.html',
//     // 在 dist/index.html 的输出
//     filename: 'index.html',
//     // 当使用 title 选项时，
//     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
//     title: '首页',
//     // 在这个页面中包含的块，默认情况下会包含
//     // 提取出来的通用 chunk 和 vendor chunk。
//     // chunks: ['chunk-vendors', 'chunk-common', 'index']
//   },
// },
