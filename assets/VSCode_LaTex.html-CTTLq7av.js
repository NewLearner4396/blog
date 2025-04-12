import{_ as i,c as t,a as s,e as o,b as a,d as l,r as p,o as u}from"./app-BSRiWrsC.js";const d={},c={href:"https://www.cnblogs.com/liuliang1999/p/12656706.html",target:"_blank",rel:"noopener noreferrer"},r={href:"https://zhuanlan.zhihu.com/p/166523064",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/hengjiu_123/article/details/110390092",target:"_blank",rel:"noopener noreferrer"},q={href:"https://miktex.org/download",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/James-Yu/LaTeX-Workshop/wiki",target:"_blank",rel:"noopener noreferrer"},b={href:"https://zhuanlan.zhihu.com/p/38178015",target:"_blank",rel:"noopener noreferrer"},x={href:"https://zhuanlan.zhihu.com/p/166523064",target:"_blank",rel:"noopener noreferrer"};function k(g,n){const e=p("ExternalLinkIcon");return u(),t("div",null,[n[13]||(n[13]=s("h2",{id:"在vscode用latex愉快地书写文章",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#在vscode用latex愉快地书写文章"},[s("span",null,"在VSCode用LaTeX愉快地书写文章")])],-1)),n[14]||(n[14]=s("h3",{id:"tex环境安装",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#tex环境安装"},[s("span",null,"Tex环境安装")])],-1)),s("p",null,[n[1]||(n[1]=a("可选TeX Live或MikTeX。MiKTeX的安装包较小，且需要的宏包可以在需要用到的时候再下载，相对不占磁盘空间，我个人使用的是MiKTex。关于两者更多的区别可以查看此篇文章：")),s("a",c,[n[0]||(n[0]=a("（译）在Windows上使用TeX：TeX Live与MiKTeX的对比")),l(e)]),n[2]||(n[2]=a("，根据自己实际需求选用。"))]),s("p",null,[n[4]||(n[4]=a("TeX Live安装可自行阅读此篇教程：")),s("a",r,[n[3]||(n[3]=a("Visual Studio Code (vscode)配置LaTeX")),l(e)])]),n[15]||(n[15]=s("p",null,"下面介绍MIKTeX安装",-1)),s("p",null,[n[6]||(n[6]=a("参考：")),s("a",v,[n[5]||(n[5]=a("MiKTeX安装")),l(e)])]),s("p",null,[n[8]||(n[8]=a("下载地址：")),s("a",q,[n[7]||(n[7]=a("https://miktex.org/download")),l(e)])]),n[16]||(n[16]=o(`<p>打开安装程序后选择安装对象（我选择为所有人安装）、安装路径后一直下一步即可。</p><p>在cmd输入<code>tex --version</code>可确认是否安装成功</p><h3 id="安装vscode插件-latex-workshop" tabindex="-1"><a class="header-anchor" href="#安装vscode插件-latex-workshop"><span>安装VSCode插件：LaTeX Workshop</span></a></h3><p>[安装LaTeX Workshop]<strong>此处本是拓展的截图</strong></p><h3 id="修改插件设置" tabindex="-1"><a class="header-anchor" href="#修改插件设置"><span>修改插件设置</span></a></h3><p>在VSCode中按<code>F1</code>或<code>Ctrl + Shift + P</code>，搜索<code>打开用户设置（JSON）</code></p><p>在括号内输入以下指令</p><div class="language-JSON line-numbers-mode" data-highlighter="prismjs" data-ext="JSON" data-title="JSON"><pre><code><span class="line">	// 选择保存后自动编译，想手动编译可调整为&quot;never&quot;</span>
<span class="line">	&quot;latex-workshop.latex.autoBuild.run&quot;: &quot;onSave&quot;,</span>
<span class="line">	// 使能菜单，在左侧栏</span>
<span class="line">    &quot;latex-workshop.showContextMenu&quot;: true,</span>
<span class="line">	// 使能自动补全命令</span>
<span class="line">    &quot;latex-workshop.intellisense.package.enabled&quot;: true,</span>
<span class="line">    // 编译出错时弹出气泡提醒出错，警告信息不要</span>
<span class="line">	&quot;latex-workshop.message.error.show&quot;: true,</span>
<span class="line">    &quot;latex-workshop.message.warning.show&quot;: false,</span>
<span class="line">    // 设置编译工具，“%DOCFILE%”使得支持编译中文名称文件</span>
<span class="line">	// &quot;-output-directory=%OUTDIR%&quot;设置输出位置</span>
<span class="line">	&quot;latex-workshop.latex.tools&quot;: [</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;xelatex&quot;,</span>
<span class="line">            &quot;command&quot;: &quot;xelatex&quot;,</span>
<span class="line">            &quot;args&quot;: [</span>
<span class="line">                &quot;-synctex=1&quot;,</span>
<span class="line">                &quot;-interaction=nonstopmode&quot;,</span>
<span class="line">                &quot;-file-line-error&quot;,</span>
<span class="line">                &quot;-output-directory=%OUTDIR%&quot;,</span>
<span class="line">                &quot;%DOCFILE%&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;pdflatex&quot;,</span>
<span class="line">            &quot;command&quot;: &quot;pdflatex&quot;,</span>
<span class="line">            &quot;args&quot;: [</span>
<span class="line">                &quot;-synctex=1&quot;,</span>
<span class="line">                &quot;-interaction=nonstopmode&quot;,</span>
<span class="line">                &quot;-file-line-error&quot;,</span>
<span class="line">                &quot;%DOCFILE%&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;latexmk&quot;,</span>
<span class="line">            &quot;command&quot;: &quot;latexmk&quot;,</span>
<span class="line">            &quot;args&quot;: [</span>
<span class="line">                &quot;-synctex=1&quot;,</span>
<span class="line">                &quot;-interaction=nonstopmode&quot;,</span>
<span class="line">                &quot;-file-line-error&quot;,</span>
<span class="line">                &quot;-pdf&quot;,</span>
<span class="line">                &quot;-outdir=%OUTDIR%&quot;,</span>
<span class="line">                &quot;%DOCFILE%&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;bibtex&quot;,</span>
<span class="line">            &quot;command&quot;: &quot;bibtex&quot;,</span>
<span class="line">            &quot;args&quot;: [</span>
<span class="line">                &quot;%DOCFILE%&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;biber&quot;,// 用于biblatex宏包的编译</span>
<span class="line">              &quot;command&quot;: &quot;biber&quot;,</span>
<span class="line">              &quot;args&quot;: [</span>
<span class="line">                &quot;--input-directory=%OUTDIR%&quot;,</span>
<span class="line">                &quot;--output-directory=%OUTDIR%&quot;,</span>
<span class="line">                  &quot;%DOCFILE%&quot;</span>
<span class="line">              ]</span>
<span class="line">        }</span>
<span class="line">    ],</span>
<span class="line">	// 设置编译链</span>
<span class="line">    &quot;latex-workshop.latex.recipes&quot;: [</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;XeLaTeX&quot;,</span>
<span class="line">            &quot;tools&quot;: [</span>
<span class="line">                &quot;xelatex&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;PDFLaTeX&quot;,</span>
<span class="line">            &quot;tools&quot;: [</span>
<span class="line">                &quot;pdflatex&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;BibTeX&quot;,</span>
<span class="line">            &quot;tools&quot;: [</span>
<span class="line">                &quot;bibtex&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;LaTeXmk&quot;,</span>
<span class="line">            &quot;tools&quot;: [</span>
<span class="line">                &quot;latexmk&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;xelatex -&gt; bibtex -&gt; xelatex*2&quot;,</span>
<span class="line">            &quot;tools&quot;: [</span>
<span class="line">                &quot;xelatex&quot;,</span>
<span class="line">                &quot;bibtex&quot;,</span>
<span class="line">                &quot;xelatex&quot;,</span>
<span class="line">                &quot;xelatex&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;pdflatex -&gt; bibtex -&gt; pdflatex*2&quot;,</span>
<span class="line">            &quot;tools&quot;: [</span>
<span class="line">                &quot;pdflatex&quot;,</span>
<span class="line">                &quot;bibtex&quot;,</span>
<span class="line">                &quot;pdflatex&quot;,</span>
<span class="line">                &quot;pdflatex&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            &quot;name&quot;: &quot;pdflatex -&gt; biber -&gt; pdflatex*2&quot;,</span>
<span class="line">            &quot;tools&quot;: [</span>
<span class="line">                &quot;pdflatex&quot;,</span>
<span class="line">                &quot;biber&quot;,</span>
<span class="line">                &quot;pdflatex&quot;,</span>
<span class="line">                &quot;pdflatex&quot;</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">    ],</span>
<span class="line">	// 设置编译失败后清除文件</span>
<span class="line">    &quot;latex-workshop.latex.clean.fileTypes&quot;: [</span>
<span class="line">        &quot;*.aux&quot;,</span>
<span class="line">        &quot;*.bbl&quot;,</span>
<span class="line">        &quot;*.blg&quot;,</span>
<span class="line">        &quot;*.idx&quot;,</span>
<span class="line">        &quot;*.ind&quot;,</span>
<span class="line">        &quot;*.lof&quot;,</span>
<span class="line">        &quot;*.lot&quot;,</span>
<span class="line">        &quot;*.out&quot;,</span>
<span class="line">        &quot;*.toc&quot;,</span>
<span class="line">        &quot;*.acn&quot;,</span>
<span class="line">        &quot;*.acr&quot;,</span>
<span class="line">        &quot;*.alg&quot;,</span>
<span class="line">        &quot;*.glg&quot;,</span>
<span class="line">        &quot;*.glo&quot;,</span>
<span class="line">        &quot;*.gls&quot;,</span>
<span class="line">        &quot;*.ist&quot;,</span>
<span class="line">        &quot;*.fls&quot;,</span>
<span class="line">        &quot;*.log&quot;,</span>
<span class="line">        &quot;*.fdb_latexmk&quot;</span>
<span class="line">    ],</span>
<span class="line">    &quot;latex-workshop.latex.autoClean.run&quot;: &quot;onFailed&quot;,</span>
<span class="line">	// 默认选择上一次使用的编译链</span>
<span class="line">    &quot;latex-workshop.latex.recipe.default&quot;: &quot;lastUsed&quot;,</span>
<span class="line">	// Ctrl+点击进行预览与文本的双向定位</span>
<span class="line">    &quot;latex-workshop.view.pdf.internal.synctex.keybinding&quot;: &quot;ctrl-click&quot;,</span>
<span class="line">    // 不使用外部PDF编辑器进行预览，这一项选择&quot;tab&quot;，如需外部的选择&quot;external&quot;</span>
<span class="line">	&quot;latex-workshop.view.pdf.viewer&quot;: &quot;tab&quot;,</span>
<span class="line">	// 设置输出目录为当前文件夹以编译文件命名的输出目录</span>
<span class="line">	&quot;latex-workshop.latex.outDir&quot;: &quot;%DIR%/%DOCFILE%_out&quot;,</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如需使用外部PDF编辑器添加以下代码(先将上文提到的<code>&quot;latex-workshop.view.pdf.viewer&quot;: &quot;tab&quot;,</code>指令删除)：</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line">    <span class="token comment">// 使用外部编辑器</span></span>
<span class="line">	<span class="token property">&quot;latex-workshop.view.pdf.viewer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;external&quot;</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token comment">// 外部编辑器打开路径</span></span>
<span class="line">    <span class="token property">&quot;latex-workshop.view.pdf.external.viewer.command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;C:/.../SumatraPDF.exe&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;latex-workshop.view.pdf.external.viewer.args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;-forward-search&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;%TEX%&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;%LINE%&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;-reuse-instance&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;-inverse-search&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// VSCode打开路径</span></span>
<span class="line">        <span class="token string">&quot;\\&quot;C:/.../Microsoft VS Code/Code.exe\\&quot; \\&quot;C:/.../Microsoft VS Code/resources/app/out/cli.js\\&quot; -gr \\&quot;%f\\&quot;:\\&quot;%l\\&quot;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;%PDF%&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不要清理生成的名字中带 synctex 的文件，否则就不能进行正向和反向搜索；</strong></p><ul><li>正向同步（tex → pdf）：<code>Ctrl + Alt + j</code></li><li>反向同步（pdf → tex）：<code>double click</code></li></ul><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试"><span>测试</span></a></h3><p>首先新建一个<code>.tex</code>文件</p><div class="language-latex line-numbers-mode" data-highlighter="prismjs" data-ext="latex" data-title="latex"><pre><code><span class="line"><span class="token function selector">\\documentclass</span><span class="token punctuation">{</span><span class="token keyword">article</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token function selector">\\usepackage</span><span class="token punctuation">{</span><span class="token keyword">lipsum</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token function selector">\\begin</span><span class="token punctuation">{</span><span class="token keyword">document</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token function selector">\\centering</span></span>
<span class="line">    Hello!World!</span>
<span class="line"><span class="token function selector">\\end</span><span class="token punctuation">{</span><span class="token keyword">document</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击右上角绿色三角形进行编译，再点击旁边的按钮进行预览</p><p><img src="http://imagebed.krins.cloud/api/image/BPR6ZBN4.png" alt="测试"></p><p><img src="http://imagebed.krins.cloud/api/image/66402242.png" alt="具体效果"></p><hr>`,19)),s("p",null,[n[10]||(n[10]=s("strong",null,"关于该插件更多用法请查看官方文档：",-1)),s("a",m,[n[9]||(n[9]=a("https://github.com/James-Yu/LaTeX-Workshop/wiki")),l(e)])]),n[17]||(n[17]=s("hr",null,null,-1)),n[18]||(n[18]=s("h3",{id:"参考链接",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#参考链接"},[s("span",null,"参考链接")])],-1)),s("p",null,[s("a",b,[n[11]||(n[11]=a("使用VSCode编写LaTeX")),l(e)])]),s("p",null,[s("a",x,[n[12]||(n[12]=a("Visual Studio Code (vscode)配置LaTeX")),l(e)])])])}const f=i(d,[["render",k]]),w=JSON.parse('{"path":"/blogs/Config/VSCode_LaTex.html","title":"VSCode编写LaTeX的相关配置","lang":"en-US","frontmatter":{"title":"VSCode编写LaTeX的相关配置","date":"2022-08-18T00:00:00.000Z","tags":["LaTeX","VSCode"],"categories":["Config"]},"headers":[{"level":2,"title":"在VSCode用LaTeX愉快地书写文章","slug":"在vscode用latex愉快地书写文章","link":"#在vscode用latex愉快地书写文章","children":[{"level":3,"title":"Tex环境安装","slug":"tex环境安装","link":"#tex环境安装","children":[]},{"level":3,"title":"安装VSCode插件：LaTeX Workshop","slug":"安装vscode插件-latex-workshop","link":"#安装vscode插件-latex-workshop","children":[]},{"level":3,"title":"修改插件设置","slug":"修改插件设置","link":"#修改插件设置","children":[]},{"level":3,"title":"测试","slug":"测试","link":"#测试","children":[]},{"level":3,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}]}],"git":{"createdTime":1744420073000,"updatedTime":1744420073000,"contributors":[{"name":"NewLearner4396","email":"NewLearner4396@users.noreply.github.com","commits":1}]},"filePathRelative":"blogs/Config/VSCode_LaTex.md"}');export{f as comp,w as data};
