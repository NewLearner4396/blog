import{_ as s,c as a,e,o as p}from"./app-BSRiWrsC.js";const l={};function c(t,n){return p(),a("div",null,n[0]||(n[0]=[e(`<h2 id="stata处理时间序列数据" tabindex="-1"><a class="header-anchor" href="#stata处理时间序列数据"><span>Stata处理时间序列数据</span></a></h2><div class="language-stata line-numbers-mode" data-highlighter="prismjs" data-ext="stata" data-title="stata"><pre><code><span class="line"><span class="token comment">//设置时间序列标识</span></span>
<span class="line"><span class="token command keyword">tsset</span> year</span>
<span class="line"><span class="token comment">// 绘制时间序列图</span></span>
<span class="line"><span class="token command keyword">tsline</span> y</span>
<span class="line"><span class="token comment">// 或是</span></span>
<span class="line"><span class="token command keyword">line</span> y year</span>
<span class="line"></span>
<span class="line"><span class="token command keyword">gen</span> lny <span class="token operator">=</span> <span class="token function">log</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span></span>
<span class="line"><span class="token command keyword">gen</span> dlny <span class="token operator">=</span> d.lny <span class="token comment">// 生成lny的一阶差分</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 查看自回归图</span></span>
<span class="line"><span class="token command keyword">corrgram</span> dlny</span>
<span class="line"><span class="token comment">// 或是单独查看ac、pac,lag为滞回阶数</span></span>
<span class="line"><span class="token command keyword">ac</span> <span class="token function">dlny</span><span class="token punctuation">(</span><span class="token punctuation">,</span><span class="token function">lag</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token command keyword">pac</span> <span class="token function">dlny</span><span class="token punctuation">(</span><span class="token punctuation">,</span><span class="token function">lag</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token command keyword">estat</span> ic <span class="token comment">// 计算回归aic信息准则，数值越小，拟合优度越好</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 计算自回归系数（序列相关系数）</span></span>
<span class="line"><span class="token comment">// 1-n阶滞后项</span></span>
<span class="line"><span class="token command keyword">reg</span> dlny <span class="token function">l</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">/</span>n<span class="token punctuation">)</span>.dlny <span class="token comment">// 回归</span></span>
<span class="line"><span class="token command keyword">arima</span> dlny<span class="token punctuation">,</span><span class="token function">ar</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">/</span>n<span class="token punctuation">)</span> <span class="token comment">// 极大似然法</span></span>
<span class="line"><span class="token comment">// arima 还可以计算MA(移动平均模型)</span></span>
<span class="line"><span class="token command keyword">arima</span> dlny<span class="token punctuation">,</span><span class="token function">ma</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">/</span>n<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 同时计算AR，MA</span></span>
<span class="line"><span class="token comment">// ARIMA (p，d，q)中</span></span>
<span class="line"><span class="token comment">// AR是“自回归”，p为自回归项数；</span></span>
<span class="line"><span class="token comment">// MA为“滑动平均”，q为滑动平均项数;</span></span>
<span class="line"><span class="token comment">// d为使之成为平稳序列所做的差分次数（阶数）</span></span>
<span class="line"><span class="token command keyword">arima</span> dlny<span class="token punctuation">,</span><span class="token function">ar</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">ma</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token command keyword">arima</span> dlny<span class="token punctuation">,</span><span class="token function">arima</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 等价于 arima lny,arima(1,1,1)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 序列平稳性检测</span></span>
<span class="line"><span class="token comment">// 单位根检验</span></span>
<span class="line"><span class="token command keyword">dfuller</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment">// arch</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// estout</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)]))}const o=s(l,[["render",c]]),m=JSON.parse('{"path":"/blogs/Miscellaneous/ecofinance.html","title":"时间序列处理的stata","lang":"en-US","frontmatter":{"title":"时间序列处理的stata","date":"2022-11-28T00:00:00.000Z","tags":["Time Series"],"categories":["Miscellaneous"]},"headers":[{"level":2,"title":"Stata处理时间序列数据","slug":"stata处理时间序列数据","link":"#stata处理时间序列数据","children":[]}],"git":{"createdTime":1744420073000,"updatedTime":1744420073000,"contributors":[{"name":"NewLearner4396","email":"NewLearner4396@users.noreply.github.com","commits":1}]},"filePathRelative":"blogs/Miscellaneous/ecofinance.md"}');export{o as comp,m as data};
