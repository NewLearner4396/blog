import{_ as i,c as p,e as t,a as n,b as a,d as o,r as l,o as r}from"./app-BSRiWrsC.js";const c={},d={href:"https://www.zhihu.com/question/370485701",target:"_blank",rel:"noopener noreferrer"},u={href:"https://blog.csdn.net/dashi_lu/article/details/89641778",target:"_blank",rel:"noopener noreferrer"};function m(h,s){const e=l("ExternalLinkIcon");return r(),p("div",null,[s[4]||(s[4]=t(`<h2 id="遇到的小问题的可能原因与解决方案😅" tabindex="-1"><a class="header-anchor" href="#遇到的小问题的可能原因与解决方案😅"><span>遇到的小问题的可能原因与解决方案😅</span></a></h2><ul><li><a href="#%E9%81%87%E5%88%B0%E7%9A%84%E5%B0%8F%E9%97%AE%E9%A2%98%E7%9A%84%E5%8F%AF%E8%83%BD%E5%8E%9F%E5%9B%A0%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88">遇到的小问题的可能原因与解决方案😅</a><ul><li><a href="#1-markdown%E7%9A%84%E7%94%A8%E6%88%B7%E4%BB%A3%E7%A0%81%E9%85%8D%E7%BD%AE">1. markdown的用户代码配置😇</a></li><li><a href="#2-git-bash%E7%9A%84%E4%BB%A3%E7%90%86%E8%AE%BE%E7%BD%AE">2. git bash的代理设置😇</a></li></ul></li></ul><h3 id="_1-markdown的用户代码配置😇" tabindex="-1"><a class="header-anchor" href="#_1-markdown的用户代码配置😇"><span>1. markdown的用户代码配置😇</span></a></h3><p>因为博客的Markdown需要一个<code>yawl</code>格式的头部代码，于是想做成<code>代码块</code>，这样就不用每次都复制粘贴。</p><p>写的效果如下：</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">    <span class="token string-property property">&quot;博客开头&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">&quot;prefix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;blog_start&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;body&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token string">&quot;---&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;title: $1&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;date: $2&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;tags:&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot; - $3&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;categories:&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;-  $4&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;---&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-property property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;博客开头的yaml标签&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是在<code>.md</code>文件中却不能调用🙃，查了一下是因为<code>VSCode</code>默认没开<code>Markdown</code>的用户代码片段，要在<code>VSCode</code>的<code>settings.json</code>中加入这么一段话：</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">    <span class="token string-property property">&quot;[markdown]&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">&quot;editor.quickSuggestions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token string-property property">&quot;other&quot;</span><span class="token operator">:</span> <span class="token string">&quot;on&quot;</span><span class="token punctuation">,</span> <span class="token comment">//是否在除了注释和字符串内启用快速建议</span></span>
<span class="line">            <span class="token string-property property">&quot;comments&quot;</span><span class="token operator">:</span> <span class="token string">&quot;off&quot;</span><span class="token punctuation">,</span><span class="token comment">//是否在注释内启用快速建议</span></span>
<span class="line">            <span class="token string-property property">&quot;strings&quot;</span><span class="token operator">:</span> <span class="token string">&quot;off&quot;</span> <span class="token comment">//是否在字符串内启用快速建议</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，在<code>Markdown</code>文件中就可以调用我在<code>markdown.json</code>中写的代码块了。</p>`,9)),n("p",null,[s[1]||(s[1]=a("参考资料链接：")),n("a",d,[s[0]||(s[0]=a("VS Code中markdown文件内为什么用户代码片段无法生效？")),o(e)])]),s[5]||(s[5]=t(`<h3 id="_2-git-bash的代理设置😇" tabindex="-1"><a class="header-anchor" href="#_2-git-bash的代理设置😇"><span>2. git bash的代理设置😇</span></a></h3><p>之前要将本地仓库的更改push到github的话，我是用的<code>github desktop</code>这款软件，图形化界面，打开代理后简单点两下就完成了。但后来想尝试一下用VSCode的<code>gitlens</code>来直接push，这样就不用再开一个软件了。但因为我是host代理，我又不想全局代理，那样会很麻烦，于是导致gitlens一直用不了我的代理，所以我只能在VSCode里开一个<code>git bash</code>终端，用<code>git指令</code>手动上传。在git里我<code>push</code>的时候一直报错🙃，原因是我设置代理一直用的是<code>https</code>的协议接口，换成<code>http</code>协议就好了。</p><p>不设置代理的报错如下：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">fatal: unable to access <span class="token string">&#39;https://github.com/NewLearner4396/blogs/&#39;</span><span class="token builtin class-name">:</span> Failed to connect to github.com port <span class="token number">443</span>: Timed out</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>代理设置如下：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> config https.proxy https://127.0.0.1:4780</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>设置完代理报错如下：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">fatal: unable to access <span class="token string">&#39;https://github.com/NewLearner4396/blogs/&#39;</span><span class="token builtin class-name">:</span> schannel: failed to receive handshake, SSL/TLS connection failed</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>后来取消了原来的代理，改成了：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> config http.proxy http://127.0.0.1:4780</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>就能正常push了。</p>`,11)),n("p",null,[s[3]||(s[3]=a("参考资料链接：")),n("a",u,[s[2]||(s[2]=a("git clone出现 fatal: unable to access 'https://github.com/...'的解决办法(亲测有效)")),o(e)])]),s[6]||(s[6]=n("h4",{id:"_3-github-copilot-chat-in-vscode-internet-connection",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_3-github-copilot-chat-in-vscode-internet-connection"},[n("span",null,"3. github copilot chat in VSCode Internet connection")])],-1)),s[7]||(s[7]=n("p",null,"如果拿到了chat的使用权限，但问问题后一直是思考中，那么可能是网络代理有些问题。",-1)),s[8]||(s[8]=n("p",null,"（前提是git设置好了全局代理，git上传没有问题）",-1)),s[9]||(s[9]=n("p",null,[a("cmd键入"),n("code",null,"curl --verbose -x http://你的代理地址:端口号 -i -L https://copilot-proxy.githubusercontent.com/_ping "),a("，若是成功，则有"),n("code",null,"HTTP/1.1 200 Connection established"),a("提示，则成功建立连接。")],-1))])}const b=i(c,[["render",m]]),k=JSON.parse('{"path":"/blogs/Miscellaneous/Tips.html","title":"记录折腾过程中遇到的坑","lang":"en-US","frontmatter":{"title":"记录折腾过程中遇到的坑","date":"2022-8-20","tags":["Tips"],"categories":["Others"]},"headers":[{"level":2,"title":"遇到的小问题的可能原因与解决方案😅","slug":"遇到的小问题的可能原因与解决方案😅","link":"#遇到的小问题的可能原因与解决方案😅","children":[{"level":3,"title":"1. markdown的用户代码配置😇","slug":"_1-markdown的用户代码配置😇","link":"#_1-markdown的用户代码配置😇","children":[]},{"level":3,"title":"2. git bash的代理设置😇","slug":"_2-git-bash的代理设置😇","link":"#_2-git-bash的代理设置😇","children":[]}]}],"git":{"createdTime":1744420073000,"updatedTime":1744420073000,"contributors":[{"name":"NewLearner4396","email":"NewLearner4396@users.noreply.github.com","commits":1}]},"filePathRelative":"blogs/Miscellaneous/Tips.md"}');export{b as comp,k as data};
