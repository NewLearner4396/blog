import{_ as t,c as r,e as l,a as s,b as n,d as a,r as d,o as c}from"./app-BSRiWrsC.js";const p={},o={href:"https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository",target:"_blank",rel:"noopener noreferrer"},m={href:"https://git-scm.com/docs/git-merge/zh_HANS-CN",target:"_blank",rel:"noopener noreferrer"},g={href:"https://docs.github.com/zh/get-started/using-git/using-git-rebase-on-the-command-line",target:"_blank",rel:"noopener noreferrer"},u={href:"https://docs.github.com/zh/get-started/using-git/resolving-merge-conflicts-after-a-git-rebase",target:"_blank",rel:"noopener noreferrer"},v={href:"https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#competing-line-change-merge-conflicts",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#removed-file-merge-conflicts",target:"_blank",rel:"noopener noreferrer"};function b(f,e){const i=d("ExternalLinkIcon");return c(),r("div",null,[e[12]||(e[12]=l(`<h2 id="git的常见用法" tabindex="-1"><a class="header-anchor" href="#git的常见用法"><span>git的常见用法</span></a></h2><h3 id="基本常见指令" tabindex="-1"><a class="header-anchor" href="#基本常见指令"><span>基本常见指令</span></a></h3><div class="language-cmd line-numbers-mode" data-highlighter="prismjs" data-ext="cmd" data-title="cmd"><pre><code><span class="line">git add . # 添加所有文件进暂存区</span>
<span class="line">git add -a # 添加所有修改的文件进暂存区</span>
<span class="line">git commit -m &quot;commit message&quot;</span>
<span class="line">git push origin Branch_name</span>
<span class="line">git fetch #命令从远程仓库获取最新的提交和更新，但不会自动合并这些更改到你的本地分支。它只是更新你的本地远程跟踪分支（例如 origin/main），你需要手动合并这些更改。</span>
<span class="line">git pull # git fetch 和 git merge 的组合。它从远程仓库获取最新的提交和更新，然后自动将这些更改合并到你的当前分支。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新建远程仓库" tabindex="-1"><a class="header-anchor" href="#新建远程仓库"><span>新建远程仓库</span></a></h3><p>可在网页端操作，也可用<code>GitHub.cli</code>工具在命令行操作</p><div class="language-cmd line-numbers-mode" data-highlighter="prismjs" data-ext="cmd" data-title="cmd"><pre><code><span class="line"># 安装GitHub.cli</span>
<span class="line">winget install --id GitHub.cli</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>重启终端</p><div class="language-cmd line-numbers-mode" data-highlighter="prismjs" data-ext="cmd" data-title="cmd"><pre><code><span class="line"># 登录账号</span>
<span class="line">gh auth login</span>
<span class="line"></span>
<span class="line"># 创建仓库</span>
<span class="line">gh repo create &lt;repository_name&gt; --private(or --public) --source=. --remote=origin</span>
<span class="line"># 也可使用 gh repo create以迭代交互的形式创建仓库</span>
<span class="line"></span>
<span class="line"># 列出账号下所有远程仓库</span>
<span class="line">gh repo list &lt;你的GitHub用户名&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化本地文件夹" tabindex="-1"><a class="header-anchor" href="#初始化本地文件夹"><span>初始化本地文件夹</span></a></h3><div class="language-cmd line-numbers-mode" data-highlighter="prismjs" data-ext="cmd" data-title="cmd"><pre><code><span class="line">git init</span>
<span class="line">git add .</span>
<span class="line">git commit -m &quot;initial commit&quot;</span>
<span class="line">git push -u origin master</span>
<span class="line"># -u 选项用于设置默认的上游分支。这样在后续的 git pull 和 git push 操作中，你可以省略远程分支的名称。即，直接使用git push/pull即可。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="large-file-storage" tabindex="-1"><a class="header-anchor" href="#large-file-storage"><span>Large File Storage</span></a></h3><p>一般建议仓库保持较小，理想情况下小于 1 GB，强烈建议小于 5 GB。</p><p>github对上传大于50MB的文件会发出警告并禁止直接上传超过100MB大小的文件，注意如果通过浏览器将文件添加到存储库，该文件不得大于 25 MB。</p><p>对个人用户，LFS用于在仓库之外上传并存储不超过2GB的文件，以及拒绝处理5GB以上的文件</p><p>LFS会生成一个text pointer用于被仓库跟踪，这样避免每次pull或push都要处理大文件耗时太长</p><div class="language-cmd line-numbers-mode" data-highlighter="prismjs" data-ext="cmd" data-title="cmd"><pre><code><span class="line"># 安装Git LFS</span>
<span class="line">winget install --id Git.LFS</span>
<span class="line"># 验证安装</span>
<span class="line">git lfs --version</span>
<span class="line"></span>
<span class="line"># 在仓库本地文件夹内初始化lfs</span>
<span class="line">git lfs install</span>
<span class="line"># 跟踪大文件并生成.gitattributes</span>
<span class="line">git lfs track &quot;path_to_largefile&quot;</span>
<span class="line"># 将文件添加到 Git 并提交更改以及推送</span>
<span class="line">git add .gitattributes</span>
<span class="line">git add path_to_largefile</span>
<span class="line">git commit -m &quot;Add large file with Git LFS&quot;</span>
<span class="line">git push</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="从仓库的历史记录中删除文件" tabindex="-1"><a class="header-anchor" href="#从仓库的历史记录中删除文件"><span>从仓库的历史记录中删除文件</span></a></h3><h4 id="删除在未推送的提交中添加的文件" tabindex="-1"><a class="header-anchor" href="#删除在未推送的提交中添加的文件"><span>删除在未推送的提交中添加的文件</span></a></h4><div class="language-cmd line-numbers-mode" data-highlighter="prismjs" data-ext="cmd" data-title="cmd"><pre><code><span class="line"># Stage our giant file for removal, but leave it on disk</span>
<span class="line">git rm --cached GIANT_FILE</span>
<span class="line"></span>
<span class="line"># Amend the previous commit with your change</span>
<span class="line"># Simply making a new commit won&#39;t work, as you need</span>
<span class="line"># to remove the file from the unpushed history as well</span>
<span class="line">git commit --amend -CHEAD</span>
<span class="line">git push</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除之前提交中添加的文件" tabindex="-1"><a class="header-anchor" href="#删除之前提交中添加的文件"><span>删除之前提交中添加的文件</span></a></h4><p>如果不想安装其他工具，可以使用交互式变基删除有问题的提交。 要执行此操作：</p><ul><li>必须知道是哪些提交添加或修改了相关文件。</li><li>这些提交必须只属于一个分支。</li><li>这些提交所在的这个分支自应用提交以来不得进行任何合并。</li></ul>`,22)),s("p",null,[e[1]||(e[1]=n("或者使用")),e[2]||(e[2]=s("code",null,"git filter-repo",-1)),e[3]||(e[3]=n(":")),s("a",o,[e[0]||(e[0]=n("从存储库中删除敏感数据")),a(i)])]),e[13]||(e[13]=l(`<h3 id="git-rm" tabindex="-1"><a class="header-anchor" href="#git-rm"><span>git rm</span></a></h3><p><code>git rm</code> 命令用于从 Git 仓库中删除文件。它不仅会从工作目录中删除文件，还会将删除操作记录到暂存区，以便在下一次提交时生效。</p><div class="language-cmd line-numbers-mode" data-highlighter="prismjs" data-ext="cmd" data-title="cmd"><pre><code><span class="line"># 删除文件</span>
<span class="line">git rm file1 file2 file3</span>
<span class="line"># 删除文件夹</span>
<span class="line">git rm -r directory</span>
<span class="line"># 如果希望从 Git 仓库中删除文件，但保留工作目录中的文件，则使用 --cached 选项</span>
<span class="line">git rm --cached filename</span>
<span class="line"># 如果文件已经被修改且未提交，Git 默认不会删除这些文件。你可以使用 -f 或 --force 选项强制删除这些文件</span>
<span class="line">git rm -f filename</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="git-merge" tabindex="-1"><a class="header-anchor" href="#git-merge"><span>git merge</span></a></h3><p>将一个或多个分支的更改合并到当前分支<code>git merge &lt;branch-name&gt;</code></p>`,5)),s("p",null,[s("a",m,[e[4]||(e[4]=n("官方介绍")),a(i)])]),e[14]||(e[14]=l(`<h3 id="合并策略" tabindex="-1"><a class="header-anchor" href="#合并策略"><span>合并策略</span></a></h3><ol><li><strong>快速前进合并（Fast-forward merge）</strong>： 如果当前分支是目标分支的直接祖先，Git 会简单地将当前分支指向目标分支。这是默认行为。</li><li><strong>非快速前进合并（Non-fast-forward merge）</strong>： 如果当前分支不是目标分支的直接祖先，Git 会创建一个新的合并提交。</li><li><strong>强制非快速前进合并</strong>： 即使可以进行快速前进合并，也强制创建一个新的合并提交：<code>git merge --no-ff &lt;branch-name&gt;</code></li></ol><h3 id="git-rebase" tabindex="-1"><a class="header-anchor" href="#git-rebase"><span>git rebase</span></a></h3><p><code>git rebase</code> 命令用于轻松更改一系列提交，修改存储库的历史记录。 您可以重新排序、编辑提交或将提交压缩到一起。</p><p>使用git rebase Git将启动默认文本编辑器并且打开一个文件，其中详细说明了所选范围的提交信息。</p><p>​ 您选择要变基的提交按最早更改（顶部）到最新更改（底部）的顺序存储。</p><p>​ 每行列出一个命令（默认为 <code>pick</code>）、提交 SHA 和提交消息。 整个 <code>git rebase</code> 过程以这三列的操作为中心。 做出的更改将变基到存储库。</p><div class="language-cmd line-numbers-mode" data-highlighter="prismjs" data-ext="cmd" data-title="cmd"><pre><code><span class="line"># 对另一个分支与当前分支状态之间的所有提交变基</span>
<span class="line">git rebase --interactive OTHER-BRANCH-NAME</span>
<span class="line"># 变基当前分支中最近的几个提交</span>
<span class="line">git rebase --interactive HEAD~7</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可用命令</p><ul><li><p><em>pick</em> <code>pick</code> 只表示包含提交。 在变基进行时重新排列 <code>pick</code> 命令的顺序会更改提交的顺序。 如果选择不包含提交，应删除整行。</p></li><li><p><em>reword</em> <code>reword</code> 命令类似于 <code>pick</code>，但在使用后，变基过程就会暂停，让你有机会改变<strong>提交消息</strong>。 提交所做的任何更改都不受影响。</p></li><li><p><em>edit</em> 如果选择 <code>edit</code> 提交，你将有机会修订提交，也就是说，可以完全添加或更改提交。 您也可以创建更多提交后再继续变基。 这样您可以将大提交拆分为小提交，或者删除在提交中执行错误更改。 当git执行到这一步时会停止并显示</p></li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">  You can amend the commit now, with</span>
<span class="line">  </span>
<span class="line">          <span class="token function">git</span> commit <span class="token parameter variable">--amend</span></span>
<span class="line">  </span>
<span class="line">  Once you are satisfied with your changes, run</span>
<span class="line">  </span>
<span class="line">          <span class="token function">git</span> rebase <span class="token parameter variable">--continue</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时您可以编辑项目中的任何文件以进行任何额外的更改。 对于你所做的每项更改，都需要执行新的提交，可以通过输入 <code>git commit --amend</code> 命令来执行此操作。 完成所有更改后，即可运行 <code>git rebase --continue</code>。</p><ul><li><p><em>squash</em> 此命令可用于将两个或以上的提交合并为一个。 下面的提交压缩到其上面的提交。 Git 让您有机会编写描述两次更改的新提交消息。</p></li><li><p><em>fixup</em> 这类似于 <code>squash</code>，但要合并的提交丢弃了其消息。 提交只是合并到其上面的提交，之前提交的消息用于描述两次更改。</p></li><li><p><em>exec</em> 这可让您对提交运行任意 shell 命令。</p></li></ul>`,13)),s("p",null,[s("a",g,[e[5]||(e[5]=n("在命令行中使用 Git rebase的简短教程")),a(i)])]),s("p",null,[s("a",u,[e[6]||(e[6]=n("解决 Git 变基后的合并冲突")),a(i)]),e[7]||(e[7]=n(" 解决完成后记得 ")),e[8]||(e[8]=s("code",null,"git rebase --continue",-1))]),s("p",null,[s("a",v,[e[9]||(e[9]=n("竞争行更改合并冲突")),a(i)]),e[11]||(e[11]=n("以及")),s("a",h,[e[10]||(e[10]=n("删除的文件合并冲突")),a(i)])])])}const x=t(p,[["render",b]]),G=JSON.parse('{"path":"/blogs/Miscellaneous/git.html","title":"git的常见用法","lang":"en-US","frontmatter":{"title":"git的常见用法","date":"2025-01-06T00:00:00.000Z","tags":["Git"],"categories":["Miscellaneous"]},"headers":[{"level":2,"title":"git的常见用法","slug":"git的常见用法","link":"#git的常见用法","children":[{"level":3,"title":"基本常见指令","slug":"基本常见指令","link":"#基本常见指令","children":[]},{"level":3,"title":"新建远程仓库","slug":"新建远程仓库","link":"#新建远程仓库","children":[]},{"level":3,"title":"初始化本地文件夹","slug":"初始化本地文件夹","link":"#初始化本地文件夹","children":[]},{"level":3,"title":"Large File Storage","slug":"large-file-storage","link":"#large-file-storage","children":[]},{"level":3,"title":"从仓库的历史记录中删除文件","slug":"从仓库的历史记录中删除文件","link":"#从仓库的历史记录中删除文件","children":[]},{"level":3,"title":"git rm","slug":"git-rm","link":"#git-rm","children":[]},{"level":3,"title":"git merge","slug":"git-merge","link":"#git-merge","children":[]},{"level":3,"title":"合并策略","slug":"合并策略","link":"#合并策略","children":[]},{"level":3,"title":"git rebase","slug":"git-rebase","link":"#git-rebase","children":[]}]}],"git":{"createdTime":1744420073000,"updatedTime":1744420073000,"contributors":[{"name":"NewLearner4396","email":"NewLearner4396@users.noreply.github.com","commits":1}]},"filePathRelative":"blogs/Miscellaneous/git.md"}');export{x as comp,G as data};
