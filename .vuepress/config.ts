import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  title: "Land of Fragment",
  description: "My Knowledge Fragments",
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  head: [
    [`style`, {}, `
      .features__container .magic-card.features__item{
        text-align: center;
        > h4 {
          font-size: 24px;
          margin-bottom: 12px;
        }
        > p {
          font-size: 30px;
          margin: 0 auto;
        }
      } 
    `]
  ],
  theme: recoTheme({
    logo: "/logo.png",
    author: "NewLearner4396",
    authorAvatar: "/portrait.jpg",
    // docsRepo: "https://github.com/NewLearner4396/blog",
    colorMode: "dark",
    editLink: false,
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    navbar: [
      { text: "Home", link: "/" },
      { text: "TimeLine", link: "/timeline.html" },
      { text: "Categories", link: "/categories/Others/1.html" },
      { text: "Tags", link: "/tags/Tips/1.html" },
      {
        text: "Docs",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/Others/OriginGuide" },
        ],
      },
      { text: "Link", link: "/friendship-link.html" },
    ],
    friendshipLinks: [
      {
        logo: "/Redns.jpg",
        link: "https://github.com/Redns",
        title: "Redns",
      }
    ],
    // 告示牌 用法：https://theme-reco.vuejs.press/docs/theme/bulletin-popover.html#%E9%85%8D%E7%BD%AE
    // bulletin: {
    //   body: [
    //     {
    //       type: "title",
    //       content:`HELLO!`,
    //       style: "font-size: 16px;",
    //     }
    //   ],
    // },
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
