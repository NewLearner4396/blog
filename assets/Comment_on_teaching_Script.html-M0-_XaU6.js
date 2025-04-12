import{_ as t,c as n,e as s,o as i}from"./app-BSRiWrsC.js";const a={};function o(l,e){return i(),n("div",null,e[0]||(e[0]=[s(`<h2 id="使用脚本快速评教" tabindex="-1"><a class="header-anchor" href="#使用脚本快速评教"><span>使用脚本快速评教</span></a></h2><p>评教选项太多，一个一个点过于麻烦，有人写了浏览器控制台脚本快速勾选，记录一下。</p><p><strong>教材评教</strong>：</p><div class="language-console line-numbers-mode" data-highlighter="prismjs" data-ext="console" data-title="console"><pre><code><span class="line">Array(0, 5, 10, 15, 20).forEach(function(v) {$(&#39;input:radio&#39;).eq(v).prop(&#39;checked&#39;, &#39;true&#39;);});</span>
<span class="line">document.querySelector(&quot;#sub&quot;).click();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>教材评教的忘记截图了，但操作流程还教师评教是一样的，看下面步骤就好了。</p><p><strong>教师评教</strong>:</p><div class="language-console line-numbers-mode" data-highlighter="prismjs" data-ext="console" data-title="console"><pre><code><span class="line">$(&quot;input[type=checkbox]&quot;).each(function() {    $(this).prop(&quot;checked&quot;, true);});</span>
<span class="line">document.querySelector(&quot;#evaText&quot;).innerText = &quot;我对老师感到很满意。&quot;;</span>
<span class="line">document.querySelector(&quot;#main &gt; form &gt; table &gt; tbody &gt; tr:nth-child(20) &gt; td &gt; input[type=button]:nth-child(2)&quot;).click();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入教师评教页面按<code>F12</code>，在弹出的窗口的上方点击控制台，在指示符后面粘贴上<code>教师评教代码</code>，按回车即可发现可选框都已被勾上啦😄</p><p><img src="https://imagebed.krins.cloud/api/image/860086ZH.png" alt="0"></p><p><img src="https://imagebed.krins.cloud/api/image/XPPXRT2H.png" alt="1"></p><p><strong>注意</strong>！！！</p><ul><li>代码为旧版本，新版评教系统更新了<code>推荐星级</code>，要自己手动打星。</li><li>新版系统还更新了<code>评语检测</code>，不能有重复的评语，需要自己更改一下。</li><li>不发布</li></ul>`,12)]))}const c=t(a,[["render",o]]),d=JSON.parse('{"path":"/blogs/Others/Comment_on_teaching_Script.html","title":"学生评教控制台脚本","lang":"en-US","frontmatter":{"title":"学生评教控制台脚本","date":"2022-12-17T00:00:00.000Z","tags":["Tips"],"categories":["Others"],"publish":false},"headers":[{"level":2,"title":"使用脚本快速评教","slug":"使用脚本快速评教","link":"#使用脚本快速评教","children":[]}],"git":{"createdTime":1744420073000,"updatedTime":1744420073000,"contributors":[{"name":"NewLearner4396","email":"NewLearner4396@users.noreply.github.com","commits":1}]},"filePathRelative":"blogs/Others/Comment_on_teaching_Script.md"}');export{c as comp,d as data};
