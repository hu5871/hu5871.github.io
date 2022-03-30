import{_ as n,c as s,o as a,d as t}from"./app.9fda2e54.js";const y='{"title":"\u57FA\u672C\u4FE1\u606F","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u672C\u4FE1\u606F","slug":"\u57FA\u672C\u4FE1\u606F"},{"level":2,"title":"vue3\u54CD\u5E94\u5F0F","slug":"vue3\u54CD\u5E94\u5F0F"},{"level":2,"title":"reactive","slug":"reactive"},{"level":2,"title":"effect","slug":"effect"},{"level":2,"title":"computed","slug":"computed"},{"level":2,"title":"ref","slug":"ref"}],"relativePath":"pages/vue/reactivity.md"}',p={},o=t(`<h2 id="\u57FA\u672C\u4FE1\u606F" tabindex="-1">\u57FA\u672C\u4FE1\u606F <a class="header-anchor" href="#\u57FA\u672C\u4FE1\u606F" aria-hidden="true">#</a></h2><p>\u4F60\u9700\u8981\u4E86\u89E3\u57FA\u672C\u7684\u6838\u5FC3\u65B9\u6CD5\u4F7F\u7528\u65B9\u5F0F\uFF0C\u8FD9\u5BF9\u4F60\u63A5\u4E0B\u6765\u7684\u9605\u8BFB\u975E\u5E38\u6709\u5229</p><h2 id="vue3\u54CD\u5E94\u5F0F" tabindex="-1">vue3\u54CD\u5E94\u5F0F <a class="header-anchor" href="#vue3\u54CD\u5E94\u5F0F" aria-hidden="true">#</a></h2><p>vue3\u91C7\u7528prox\u6765\u5B9E\u73B0\u54CD\u5E94\u5F0F\u89E3\u51B3\u4E86\u4EC0\u4E48?</p><ol><li>\u4E0D\u9700\u8981\u5BF9\u5C5E\u6027\u91CD\u5199\u6DFB\u52A0getter\u53CAsetter</li><li>\u65E0\u6CD5\u76D1\u63A7\u65B0\u589E\u548C\u5220\u9664\u5C5E\u6027\u7684\u53D8\u5316\uFF0C\u6240\u4EE5\u6709\u4E86$set\u3001$delete</li><li>\u4E0D\u9700\u8981\u5BF9\u6570\u7EC4\u5355\u72EC\u5904\u7406\uFF08\u91CD\u51997\u4E2D\u6570\u7EC4\u65B9\u6CD5...\uFF09</li></ol><h2 id="reactive" tabindex="-1">reactive <a class="header-anchor" href="#reactive" aria-hidden="true">#</a></h2><p>reactive\u65B9\u6CD5\u4F1A\u5C06\u5BF9\u8C61\u53D8\u6210proxy\u5BF9\u8C61\uFF0Ceffect\u4E2D\u4F7F\u7528reactive\u5BF9\u8C61\u65F6\u4F1A\u8FDB\u884C\u4F9D\u8D56\u6536\u96C6\uFF0C\u7A0D\u540E\u5C5E\u6027\u53D8\u5316\u65F6\u4F1A\u91CD\u65B0\u6267\u884Ceffect\u51FD\u6570\u3002</p><p>@vue/shared \u653E\u7F6E\u4E00\u4E9B\u516C\u7528\u5DE5\u5177\u51FD\u6570</p><div class="language-typescript"><pre><code><span class="token comment">//\u68C0\u67E5\u662F\u5426\u662F\u6570\u7EC4\u6216\u8005\u5BF9\u8C61</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span><span class="token operator">:</span> value <span class="token keyword">is</span> Record<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> value <span class="token operator">===</span><span class="token string">&#39;object&#39;</span><span class="token operator">&amp;&amp;</span> value <span class="token operator">!==</span><span class="token keyword">null</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-typescript"><pre><code><span class="token keyword">import</span><span class="token punctuation">{</span> isObject <span class="token punctuation">}</span><span class="token keyword">from</span><span class="token string">&quot;@vue/shared&quot;</span>

<span class="token keyword">const</span> <span class="token keyword">enum</span> ReactiveFlags <span class="token punctuation">{</span>
  <span class="token constant">IS_REACTIVE</span><span class="token operator">=</span><span class="token string">&#39;__v_isReactive&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> mutableHandlers<span class="token operator">:</span> ProxyHandler<span class="token operator">&lt;</span>object<span class="token operator">&gt;=</span><span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//\u5F53\u5DF2\u7ECF\u88AB\u4EE3\u7406\u8FC7\u7684\u5BF9\u8C61\u518D\u6B21\u4F20\u5165\u65F6\uFF0C\u8FD4\u56DE\u5DF2\u7ECF\u4EE3\u7406\u8FC7\u7684\u5BF9\u8C61</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>key <span class="token operator">===</span> ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_REACTIVE</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">// \u5728get\u4E2D\u589E\u52A0\u6807\u8BC6\uFF0C\u5F53\u83B7\u53D6IS_REACTIVE\u65F6\u8FD4\u56DE</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
  <span class="token comment">// \u7B49\u4F1A\u8C01\u6765\u53D6\u503C\u5C31\u505A\u4F9D\u8D56\u6536\u96C6</span>
  <span class="token comment">// \u5199effect\u8865\u5145</span>
    
    <span class="token keyword">const</span> res <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> res<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
    <span class="token comment">// \u7B49\u4F1A\u8D4B\u503C\u7684\u65F6\u5019\u53EF\u4EE5\u91CD\u65B0\u89E6\u53D1effect\u6267\u884C</span>
    <span class="token comment">//\u5199effect\u8865\u5145</span>
    
    <span class="token keyword">const</span> result <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>target<span class="token operator">:</span> object<span class="token punctuation">,</span> isReadonly<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_REACTIVE</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">// \u5728\u521B\u5EFA\u54CD\u5E94\u5F0F\u5BF9\u8C61\u65F6\u5148\u8FDB\u884C\u53D6\u503C\uFF0C\u770B\u662F\u5426\u5DF2\u7ECF\u662F\u54CD\u5E94</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>
  
  <span class="token comment">//\u53EA\u5BF9\u5E38\u7528\u7684\u6570\u7EC4\u6216\u8005\u5BF9\u8C61\u505A\u4EE3\u7406</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> exisitingProxy<span class="token operator">=</span>reactiveMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u5982\u679C\u7F13\u5B58\u4E2D\u6709\u76F4\u63A5\u4F7F\u7528\u4E0A\u4E00\u6B21\u7684\u4EE3\u7406\u7ED3\u679C </span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>exisitingProxy<span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">return</span> exisitingProxy
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> proxy<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>mutableHandlers<span class="token punctuation">)</span>
  reactiveMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>proxy<span class="token punctuation">)</span><span class="token comment">//\u5C06\u539F\u5BF9\u8C61\u548C\u751F\u6210\u7684\u4EE3\u7406\u5BF9\u8C61 \u505A\u4E00\u4E2A\u6620\u5C04\u8868</span>
  <span class="token keyword">return</span> proxy
<span class="token punctuation">}</span>

<span class="token keyword">const</span> reactiveMap<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//WeakMap \u5F31\u5F15\u7528  key\u5FC5\u987B\u662F\u5BF9\u8C61 \u5982\u679Ckey\u6CA1\u6709\u88AB\u5F15\u7528\u88AB\u81EA\u52A8\u9500\u6BC1</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">reactive</span><span class="token punctuation">(</span>target<span class="token operator">:</span> object<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>




</code></pre></div><h2 id="effect" tabindex="-1">effect <a class="header-anchor" href="#effect" aria-hidden="true">#</a></h2><div class="language-typescript"><pre><code><span class="token keyword">let</span> effectStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">// \u5F53\u524D\u6B63\u5728\u6267\u884C\u7684effect</span>
<span class="token keyword">let</span> activeEffect<span class="token punctuation">;</span><span class="token comment">// \u5B58\u653Eeffect\u5217\u8868</span>

<span class="token keyword">function</span> <span class="token function">clealupEffect</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> deps <span class="token punctuation">}</span> <span class="token operator">=</span> effect
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> dep <span class="token keyword">of</span> deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dep<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u79FB\u9664\u5C5E\u6027\u5BF9\u5E94\u7684effect</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ReactiveEffect</span> <span class="token punctuation">{</span>

  active <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span><span class="token comment">//\u6FC0\u6D3B\u72B6\u6001</span>
  deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//\u8BA9effct\u8BB0\u5F55\u5B83\u4F9D\u8D56\u4E86\u54EA\u4E9B\u5C5E\u6027\uFF0C\u540C\u65F6\u8981\u8BB0\u5F55\u5F53\u524D\u5C5E\u6027\u4F9D\u8D56\u54EA\u4E2Aeffect</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> fn<span class="token punctuation">,</span> <span class="token keyword">public</span> scheduler<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>

  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//\u6267\u884Cfn</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//\u975E\u6FC0\u6D3B\u72B6\u6001\u8C03\u7528run\u65B9\u6CD5</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>effectStack<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// \u9632\u6B62effect\u4E2D\u4FEE\u6539\u5185\u5BB9\u5BFC\u81F4\u91CD\u590D\u66F4\u65B0,\u6B7B\u5FAA\u73AF</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        effectStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>activeEffect <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u53D6\u503C new Proxy \u4F1A\u6267\u884Cget\u65B9\u6CD5\u300A\u4F9D\u8D56\u6536\u96C6\u300B</span>
      <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        effectStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u6267\u884C\u5B8C\u5220\u9664\u6808\u4E2D\u6700\u540E\u4E00\u4E2Aeffect</span>
        activeEffect <span class="token operator">=</span> effectStack<span class="token punctuation">[</span>effectStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//\u8BA9effect\u548Cdep\u53D6\u6D88\u5173\u8054\u3002dep\u4E0A\u9762\u7684\u50A8\u5B58\u7684effect\u79FB\u9664\u6389</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">clealupEffect</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isTacking</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//\u662F\u5426\u9700\u8981\u6536\u96C6</span>
  <span class="token keyword">return</span> activeEffect <span class="token operator">!==</span> <span class="token keyword">undefined</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> targetMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//\u4E00\u4E2A\u5C5E\u6027\u5BF9\u5E94\u591A\u4E2Aeffect\uFF0C\u4E00\u4E2Aeffect\u4E2D\u4F9D\u8D56\u4E86\u591A\u4E2A\u5C5E\u6027</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isTacking</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//\u5C5E\u6027\u4E0D\u4F9D\u8D56\u4E8Eeffect\u76F4\u63A5\u8DF3\u51FA</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    targetMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//{\u5BF9\u8C61\uFF1Amap{}}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> dep <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//{\u5BF9\u8C61\uFF1Amap{key:set:[]}}  \u4E00\u4E2A\u5C5E\u6027\u53EF\u80FD\u5BF9\u8C61\u591A\u4E2Aeffect</span>
  <span class="token punctuation">}</span>

  <span class="token function">trackEffects</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trackEffects</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> shouldTrack <span class="token operator">=</span> <span class="token operator">!</span>dep<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldTrack<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dep<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token comment">//{\u5BF9\u8C61\uFF1Amap{key:set:[effect\uFF0Ceffect]}} </span>
    activeEffect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">//\u5C06\u5C5E\u6027\u548C\u5BF9\u5E94\u7684effect\u7EF4\u62A4\u6210\u6620\u5C04\u5173\u7CFB\uFF0C\u540E\u7EED\u5C5E\u6027\u53D8\u5316\u53EF\u4EE5\u89E6\u53D1\u5BF9\u5E94\u7684effect\u51FD\u6570\u91CD\u65B0run</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trigeer</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// \u83B7\u53D6\u5BF9\u5E94\u7684\u6620\u5C04\u8868</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> effects <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> dep <span class="token keyword">of</span> deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    effects<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>dep<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// \u5C06effect\u5168\u90E8\u5B58\u5230effects\u4E2D</span>
  <span class="token punctuation">}</span>
  <span class="token function">triggerEffects</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">const</span> _effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token comment">// \u521B\u5EFA\u54CD\u5E94\u5F0Feffect</span>
  _effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// \u8BA9\u54CD\u5E94\u5F0Feffect\u9ED8\u8BA4\u6267\u884C</span>
  <span class="token keyword">let</span> runner <span class="token operator">=</span> _effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>_effect<span class="token punctuation">)</span> <span class="token comment">//\u8FD4\u56DE\u4E00\u4E2Arun\uFF0C\u4F9B\u7528\u6237\u9009\u62E9\u518D\u6B21\u6267\u884C</span>
  runner<span class="token punctuation">.</span>_effect <span class="token operator">=</span> _effect
  <span class="token keyword">return</span> runner
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">triggerEffects</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> effect <span class="token keyword">of</span> dep<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//\u5982\u679C\u5F53\u524Deffect\u6267\u884C\u548C\u8981\u6267\u884C\u7684effect\u662F\u540C\u4E00\u4E2A\uFF0C\u4E0D\u6267\u884C\uFF0C\u9632\u6B62\u5FAA\u73AF</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>effect <span class="token operator">!==</span> activeEffect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>effect<span class="token punctuation">.</span>scheduler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> effect<span class="token punctuation">.</span><span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//\u6267\u884Ceffect</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="\u4F9D\u8D56\u6536\u96C6\u548C\u89E6\u53D1\u66F4\u65B0" tabindex="-1">\u4F9D\u8D56\u6536\u96C6\u548C\u89E6\u53D1\u66F4\u65B0 <a class="header-anchor" href="#\u4F9D\u8D56\u6536\u96C6\u548C\u89E6\u53D1\u66F4\u65B0" aria-hidden="true">#</a></h4><p>\u56DE\u5230reactive</p><div class="language-typescript"><pre><code><span class="token keyword">const</span> mutableHandlers<span class="token operator">:</span>ProxyHandler<span class="token operator">&lt;</span>Record<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span><span class="token builtin">any</span><span class="token operator">&gt;&gt;=</span><span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>recevier<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//recevier\u4EE3\u7406\u5BF9\u8C61\u7684\u672C\u8EAB</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>key <span class="token operator">===</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_REACTIVE</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u53D6\u503C\u65F6\uFF0C\u53EF\u4EE5\u6536\u96C6\u5B83\u5728\u54EA\u4E2Aeffect\u4E2D</span>
    <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">)</span>
    
    <span class="token keyword">const</span> res<span class="token operator">=</span>Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>recevier<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//target[key]</span>
    <span class="token keyword">return</span> res
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">,</span>recevier<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">let</span> oldValue<span class="token operator">=</span><span class="token punctuation">(</span>target <span class="token keyword">as</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> 
    <span class="token keyword">const</span> res<span class="token operator">=</span>Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">,</span>recevier<span class="token punctuation">)</span><span class="token comment">//target[key]=value</span>
    <span class="token comment">//\u6539\u503C\u65F6\uFF0C\u53EF\u4EE5\u89E6\u53D1effect\u66F4\u65B0</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>oldValue <span class="token operator">!==</span> value<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//\u503C\u6CA1\u53D8\u4E0D\u9700\u8981\u89E6\u53D1effect\u6267\u884C</span>
    <span class="token function">trigeer</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
    
    <span class="token keyword">return</span> res
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="computed" tabindex="-1">computed <a class="header-anchor" href="#computed" aria-hidden="true">#</a></h2><p>computed\u63A5\u6536\u4E00\u4E2A\u51FD\u6570\uFF0C\u5E76\u6839\u636Egetter\u7684\u8FD4\u56DE\u503C\u8FD4\u56DE\u4E00\u4E2A\u4E0D\u53EF\u53D8\u7684\u54CD\u5E94\u5F0Fref\u5BF9\u8C61</p><div class="language-typescript"><pre><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>value<span class="token operator">:</span><span class="token builtin">unknown</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token builtin">boolean</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>computed</p><div class="language-typescript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isFunction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@vue/shared&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> isTacking<span class="token punctuation">,</span> ReactiveEffect<span class="token punctuation">,</span> trackEffects<span class="token punctuation">,</span> triggerEffects <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./effect&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">ComputedRefImpl</span><span class="token punctuation">{</span>
  <span class="token keyword">public</span> dep<span class="token punctuation">;</span>
  <span class="token keyword">public</span> _dirty<span class="token operator">=</span><span class="token boolean">true</span>
  <span class="token keyword">public</span> __v_isRef<span class="token operator">=</span><span class="token boolean">true</span>
  <span class="token keyword">public</span> effect
  <span class="token keyword">public</span> _value
  <span class="token function">constructor</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span><span class="token keyword">public</span> setter<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dirty<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_dirty<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token function">triggerEffects</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dep<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isTacking</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token function">trackEffects</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dep<span class="token operator">||</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dep<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dirty<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//\u5C06\u7ED3\u679C\u7F13\u5B58\u5230this._value  \u4E0D\u4F1A\u6BCF\u6B21\u90FDrun</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_dirty<span class="token operator">=</span><span class="token boolean">false</span>
    <span class="token punctuation">}</span>
   
   <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setter</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">// \u63A5\u6536\u4E00\u4E2Aget\u51FD\u6570\u6216\u8005get\u548Cset\u9009\u9879</span>
   <span class="token keyword">const</span> onlyGetter<span class="token operator">=</span><span class="token function">isFunction</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>

   <span class="token keyword">let</span> getter<span class="token punctuation">;</span>
   <span class="token keyword">let</span> setter<span class="token punctuation">;</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>onlyGetter<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//\u5982\u679C\u662Fget\u51FD\u6570</span>
     getter<span class="token operator">=</span>options
     <span class="token function-variable function">setter</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    getter<span class="token operator">=</span>options<span class="token punctuation">.</span>get
    setter<span class="token operator">=</span>options<span class="token punctuation">.</span>set
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ComputedRefImpl</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span>setter<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="ref" tabindex="-1">ref <a class="header-anchor" href="#ref" aria-hidden="true">#</a></h2><p>\u63A5\u6536\u4E00\u4E2A\u503C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u54CD\u5E94\u5F0F\u53EF\u53D8\u7684ref\u5BF9\u8C61</p><div class="language-typescript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isTacking<span class="token punctuation">,</span> trackEffects<span class="token punctuation">,</span> triggerEffects <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./effect&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> toReactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./reactive&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">RefImpl</span><span class="token punctuation">{</span>
  <span class="token keyword">public</span> dep<span class="token punctuation">;</span>
  <span class="token keyword">public</span> __v_isRef<span class="token punctuation">;</span>
  <span class="token keyword">public</span> _value<span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> _rawValue<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token operator">=</span><span class="token function">toReactive</span><span class="token punctuation">(</span>_rawValue<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isTacking</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token function">trackEffects</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dep<span class="token operator">||</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dep<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>newVal<span class="token operator">!==</span><span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue<span class="token operator">=</span>newVal
     <span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token operator">=</span><span class="token function">toReactive</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
     <span class="token function">triggerEffects</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dep<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createRef</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RefImpl</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">ref</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token function">createRef</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div>`,23),e=[o];function c(u,k,l,i,r,f){return a(),s("div",null,e)}var w=n(p,[["render",c]]);export{y as __pageData,w as default};
