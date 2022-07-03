module.exports = {
  title: '前端',
  lang: 'zh-CN',
  description: '记录一些有趣的',
  head: createHead(),
  themeConfig: {
    nav: [
      { text: '源码', children: [{ text: 'vue3源码', link: '/pages/vue/reactivity' }] },
      { text: '面试题', children: [{ text: '面试题', link: '/pages/js/js' }] },
      { text: 'TS', children: [{ text: 'typeScript', link: '/pages/ts/index' }] },
      { text: '数据库', children: [{ text: 'mysql', link: '/pages/mysql/mysql' }] },
      { text: '实用的库', children: [{ text: '实用的库', link: '/pages/useLibrary/index' }] },
      {
        text: '数据结构与算法',
        children: [
          { text: '数据结构', link: '/pages/DSAA/dataStructure' },
          { text: '算法', link: '/pages/DSAA/algorithm' },
        ],
      },
      { text: '设计模式', children: [{ text: '设计模式', link: '/pages/designPattern/index' }] },
      { text: '容器与集成部署', children: [{ text: 'docker', link: '/pages/containerAndIntegration/docker' },
      { text: 'jenkins', link: '/pages/containerAndIntegration/jenkins' }] },
      { text: 'ide', children: [{ text: 'vscode', link: '/pages/ide/index' }] },
      { text: '其他工具', children: [{ text: '其他工具', link: '/pages/utils/index' }] },
    ],
    sidebar: createSidebar(),
    base: '/',
    docsBranch: 'main',
    editLinks: true,
  },
};

function createHead() {
  return [
    ['meta', { name: 'author', content: 'Vbenjs Team' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'vben, vitejs, vite, ant-design-vue, vue',
      },
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
    ],
    ['meta', { name: 'keywords', content: 'vue vben admin docs' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ];
}

function createSidebar() {
  return {
    '/pages/vue': [
      {
        text: 'vue源码',
        children: [
          {
            text: '响应式原理',
            link: '/pages/vue/reactivity',
          },
          {
            text: 'diff算法',
            link: '/pages/vue/diff',
          },
        ],
      },
    ],
    '/pages/js': [
      {
        text: '面试题',
        children: [
          {
            text: 'javascript基础',
            link: '/pages/js/js',
          },
          {
            text: 'javascript进阶',
            link: '/pages/js/javascriptAD',
          },
          {
            text: 'vue',
            link: '/pages/js/vue',
          },
          {
            text: '微信小程序',
            link: '/pages/js/wx',
          },
          {
            text: 'http',
            link: '/pages/js/http',
          },
          {
            text: 'git',
            link: '/pages/js/git',
          }
        ],
      },
    ],
    '/pages/DSAA': [
      {
        text: '数据结构与算法',
        children: [
          {
            text: '数据结构',
            link: '/pages/DSAA/dataStructure',
          },
          {
            text: '算法',
            link: '/pages/DSAA/algorithm',
          },
        ],
      },
    ],
    '/pages/mysql': [
      {
        text: 'MySQL',
        children: [
          {
            text: 'mysql',
            link: '/pages/mysql/mysql',
          },
        ],
      },
    ],
    '/pages/useLibrary': [
      {
        text: '让业务更简单',
        children: [
          {
            text: '实用的库',
            link: '/pages/useLibrary/index',
          },
        ],
      },
    ],
    '/pages/designPattern': [
      {
        text: '优雅永不过时',
        children: [
          {
            text: '设计模式',
            link: '/pages/designPattern/index',
          },
        ],
      },
    ],
    '/pages/ts': [
      {
        text: 'typeScript',
        children: [
          {
            text: 'ts',
            link: '/pages/ts/index',
          },
        ],
      },
    ],
    '/pages/containerAndIntegration': [
      {
        text: '容器与持续集成部署',
        children: [
          {
            text: 'docker',
            link: '/pages/containerAndIntegration/docker',
          },
          {
            text: 'jenkins',
            link: '/pages/containerAndIntegration/jenkins',
          },
        ],
      },
    ],
    '/pages/ide': [
      {
        text: '插件减少繁琐内容',
        children: [
          {
            text: 'vscode插件',
            link: '/pages/ide/index',
          },
        ],
      },
    ],
    '/pages/utils': [
      {
        text: '',
        children: [
          {
            text: '优秀的工具',
            link: '/pages/utils/index',
          },
        ],
      },
    ],
  };
}
