---
layout: default
title: 知识分享
permalink: /knowledge/
---

<section>
  <h1 class="neon">知识分享</h1>
  <p class="muted">沉淀与传播。上传新的 markdown 到 <code>_knowledge/</code> 目录即可自动出现在这里。</p>
  <div class="list-grid">
  {%- assign list = site.knowledge | sort: 'date' | reverse -%}
  {%- for doc in list -%}
    <article class="card">
      <div class="meta">
        {%- if doc.date -%}<time>{{ doc.date | date: "%Y-%m-%d" }}</time>{%- endif -%}
        {%- if doc.tags -%}
          · {%- for t in doc.tags -%}<span class="badge">#{{ t }}</span>{%- endfor -%}
        {%- endif -%}
      </div>
      <h3><a href="{{ doc.url | relative_url }}">{{ doc.title }}</a></h3>
      <p class="excerpt">{{ doc.excerpt | default: doc.description | default: doc.summary | default: doc.content | strip_html | truncate: 120 }}</p>
    </article>
  {%- endfor -%}
  </div>
</section>
