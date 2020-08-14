module.exports = {
  rules: {
    /**
     * vue
     */
    // 强制属性用短横线连接而不是驼峰命名
    'vue/attribute-hyphenation': [0],
    // 每一行 html 最多可使用几个属性
    'vue/max-attributes-per-line': ['error', {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
    // 单行 html 元素内容是否需要另起一行
    'vue/singleline-html-element-content-newline': [0],
    // 'vue/multiline-html-element-content-newline': [0],
    // 自闭合标签
    // 'vue/html-self-closing': ['error', {
    //   'html': {
    //     /**
    //      * 空元素 void element
    //      * area, base, br, col, command, embed, hr, img
    //      * input, keygen, link, meta, param, source, track, wbr
    //      */
    //     'void': 'never',
    //     'normal': 'never', // 正常元素，如 div
    //     'component': 'always',
    //   },
    //   'svg': 'always',
    //   'math': 'always',
    // }],
  },
}
