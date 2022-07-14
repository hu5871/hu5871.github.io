import{_ as s,c as a,o as n,d as e}from"./app.a4c349e0.js";const A=JSON.parse('{"title":"git\u5BC6\u94A5\u751F\u6210","description":"","frontmatter":{},"headers":[{"level":3,"title":"git\u5BC6\u94A5\u751F\u6210","slug":"git\u5BC6\u94A5\u751F\u6210"},{"level":3,"title":"\u5207\u6362\u5206\u652F","slug":"\u5207\u6362\u5206\u652F"},{"level":3,"title":"\u67E5\u770B\u5206\u652F","slug":"\u67E5\u770B\u5206\u652F"},{"level":3,"title":"\u5408\u5E76\u5206\u652F","slug":"\u5408\u5E76\u5206\u652F"},{"level":3,"title":"\u64A4\u9500\u4E0A\u4E00\u6B21commit \u7684\u5185\u5BB9","slug":"\u64A4\u9500\u4E0A\u4E00\u6B21commit-\u7684\u5185\u5BB9"},{"level":3,"title":"\u5220\u9664\u5206\u652F","slug":"\u5220\u9664\u5206\u652F"},{"level":3,"title":"\u672C\u5730\u6709\u4FEE\u6539\uFF0C\u4F46\u662F\u60F3\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F\u4EE3\u7801","slug":"\u672C\u5730\u6709\u4FEE\u6539\uFF0C\u4F46\u662F\u60F3\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F\u4EE3\u7801"},{"level":3,"title":"commit\u4E4B\u540E\u60F3\u64A4\u9500commit","slug":"commit\u4E4B\u540E\u60F3\u64A4\u9500commit"},{"level":3,"title":"\u5173\u8054\u8FDC\u7A0B\u4ED3\u5E93","slug":"\u5173\u8054\u8FDC\u7A0B\u4ED3\u5E93"},{"level":3,"title":"\u53D6\u6D88\u8FDC\u7A0B\u4ED3\u5E93\u5173\u8054","slug":"\u53D6\u6D88\u8FDC\u7A0B\u4ED3\u5E93\u5173\u8054"}],"relativePath":"pages/js/git.md"}'),l={name:"pages/js/git.md"},p=e(`<h3 id="git\u5BC6\u94A5\u751F\u6210" tabindex="-1">git\u5BC6\u94A5\u751F\u6210 <a class="header-anchor" href="#git\u5BC6\u94A5\u751F\u6210" aria-hidden="true">#</a></h3><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">ssh-keygen -o</span></span>
<span class="line"><span style="color:#A6ACCD;">cat </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_rsa.pub</span></span>
<span class="line"></span></code></pre></div><h3 id="\u5207\u6362\u5206\u652F" tabindex="-1">\u5207\u6362\u5206\u652F <a class="header-anchor" href="#\u5207\u6362\u5206\u652F" aria-hidden="true">#</a></h3><ul><li><p>\u5207\u6362\u8FDC\u7A0B\u5206\u652F</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git checkout </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">\u5206\u652F\u540D</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div></li></ul><h3 id="\u67E5\u770B\u5206\u652F" tabindex="-1">\u67E5\u770B\u5206\u652F <a class="header-anchor" href="#\u67E5\u770B\u5206\u652F" aria-hidden="true">#</a></h3><ul><li><p>\u67E5\u770B\u672C\u5730\u5206\u652F</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git branch </span></span>
<span class="line"></span></code></pre></div></li><li><p>\u67E5\u770B\u8FDC\u7A0B\u5206\u652F</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git branch -r</span></span>
<span class="line"></span></code></pre></div></li><li><p>\u67E5\u770B\u6240\u6709\u5206\u652F</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git branch -a </span></span>
<span class="line"></span></code></pre></div></li></ul><h3 id="\u5408\u5E76\u5206\u652F" tabindex="-1">\u5408\u5E76\u5206\u652F <a class="header-anchor" href="#\u5408\u5E76\u5206\u652F" aria-hidden="true">#</a></h3><p>\u5408\u5E76\u524D\u9700\u8981\u63A8\u4E0A\u4EE3\u7801\uFF0C\u5207\u6362\u5230\u8981\u5408\u5E76\u7684\u5206\u652F</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git checkout master</span></span>
<span class="line"><span style="color:#A6ACCD;">git merge </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">\u5206\u652F\u540D</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="\u64A4\u9500\u4E0A\u4E00\u6B21commit-\u7684\u5185\u5BB9" tabindex="-1">\u64A4\u9500\u4E0A\u4E00\u6B21commit \u7684\u5185\u5BB9 <a class="header-anchor" href="#\u64A4\u9500\u4E0A\u4E00\u6B21commit-\u7684\u5185\u5BB9" aria-hidden="true">#</a></h3><p>\u8BE5\u64CD\u4F5C\u4F1A\u5F7B\u5E95\u56DE\u9000\u5230\u67D0\u4E2A\u7248\u672C\uFF0C\u672C\u5730\u7684\u6E90\u7801\u4E5F\u4F1A\u53D8\u4E3A\u4E0A\u4E00\u4E2A\u7248\u672C\u7684\u5185\u5BB9</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git reset --hard </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">commit-id</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="\u5220\u9664\u5206\u652F" tabindex="-1">\u5220\u9664\u5206\u652F <a class="header-anchor" href="#\u5220\u9664\u5206\u652F" aria-hidden="true">#</a></h3><p><strong>\u8C28\u614E\u4F7F\u7528</strong></p><ul><li><p>\u5220\u9664\u8FDC\u7A0B\u5206\u652F</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git push origin --delete </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">\u5206\u652F\u540D\u79F0</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div></li><li><p>\u5220\u9664\u672C\u5730\u5206\u652F</p><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;"> git branch -d </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">\u5206\u652F\u540D\u79F0</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div></li></ul><h3 id="\u672C\u5730\u6709\u4FEE\u6539\uFF0C\u4F46\u662F\u60F3\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F\u4EE3\u7801" tabindex="-1">\u672C\u5730\u6709\u4FEE\u6539\uFF0C\u4F46\u662F\u60F3\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F\u4EE3\u7801 <a class="header-anchor" href="#\u672C\u5730\u6709\u4FEE\u6539\uFF0C\u4F46\u662F\u60F3\u62C9\u53D6\u8FDC\u7A0B\u5206\u652F\u4EE3\u7801" aria-hidden="true">#</a></h3><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">#\u9996\u5148\u5C06\u672C\u5730\u4FEE\u6539stash</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#\u62C9\u53D6\u6700\u65B0\u4EE3\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;">git pull</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#\u5F39\u51FA\u4E4B\u524D\u7684\u4FEE\u6539</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash pop</span></span>
<span class="line"></span></code></pre></div><h3 id="commit\u4E4B\u540E\u60F3\u64A4\u9500commit" tabindex="-1">commit\u4E4B\u540E\u60F3\u64A4\u9500commit <a class="header-anchor" href="#commit\u4E4B\u540E\u60F3\u64A4\u9500commit" aria-hidden="true">#</a></h3><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git reset --soft HEAD^ </span></span>
<span class="line"></span></code></pre></div><h3 id="\u5173\u8054\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1">\u5173\u8054\u8FDC\u7A0B\u4ED3\u5E93 <a class="header-anchor" href="#\u5173\u8054\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a></h3><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git remote add origin \u5730\u5740</span></span>
<span class="line"></span></code></pre></div><h3 id="\u53D6\u6D88\u8FDC\u7A0B\u4ED3\u5E93\u5173\u8054" tabindex="-1">\u53D6\u6D88\u8FDC\u7A0B\u4ED3\u5E93\u5173\u8054 <a class="header-anchor" href="#\u53D6\u6D88\u8FDC\u7A0B\u4ED3\u5E93\u5173\u8054" aria-hidden="true">#</a></h3><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">git remote remove origin</span></span>
<span class="line"></span></code></pre></div>`,23),c=[p];function i(t,o,r,d,h,g){return n(),a("div",null,c)}var C=s(l,[["render",i]]);export{A as __pageData,C as default};