module.exports = {
  title: "My New World",
  description: 'Welcome to my little world .',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      /**
       * 点击返回首页
       */
      { text: 'Home', link: '/', icon: 'reco-home' },


      /**
       * 时间线
      */
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },


      /**
       * 资源下载(电子书籍等)
      */
      { text: 'Resources', 
        icon: 'reco-message',
        items: [
          { text: 'TextBook', link: '/resources/TextBook/' },
          { text: 'Software', link: '/resources/Software/' }
        ]
      },


      /**
       * 联系方式(Github首页)
      */
      { text: 'Contact', 
        icon: 'reco-message',
        items: [
          { text: 'GitHub', link: 'https://github.com/NewLearner4396/', icon: 'reco-github' },
          { text: 'GitHubMaster', link: 'https://github.com/Redns?tab=repositories', icon: 'reco-github' }
        ]
      }
    ],
    sidebar: {
      '/docs/theme-reco/': [
        '',
        'theme',
        'plugin',
        'api'
      ]
    },  
    type: 'blog',

    /**
     * 博客设置
     */
    blogConfig: {
      category: {
        location: 2,      // 在导航栏菜单中所占的位置，默认2
        text: 'Category'  // 默认 “分类”
      },
      tag: {
        location: 3,      // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'       // 默认 “标签”
      }
    },
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme. &#10 A simple and beautiful vuepress blog theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
      {
        title: 'krins\'s little World',
        desc: 'Welcome to his little world.',
        avatar: "/jing.jpeg",
        link: 'https://krins.vercel.app/'
      },
    ],
    logo: '/logo.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'NewLearner4396',
    // 作者头像
    authorAvatar: '/portrait.jpg',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2017',
    heroText: 'vuepress-theme-reco',
    tagline: 'A simple and beautiful vuepress blog theme.'
  },
  markdown: {
    lineNumbers: true
  }
}  
