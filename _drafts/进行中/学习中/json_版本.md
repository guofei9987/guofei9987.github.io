


对应 os.json， Jekyll 最新版本才可以运行。但 GitHub 上是旧版本，因此复杂很多。

```
[
{% assign os_posts = site.os | sort: "order" %}
{% assign grouped = os_posts | group_by: "tag" %}

{% assign sorted_grouped = grouped | sort: "items[0].order" %}

{% for group in sorted_grouped %}
  {
    "tagName": "{{ group.name }}",
    "posts": [
      {% assign sorted_posts = group.items | sort: "order" %}
      {% for post in sorted_posts %}
      {
        "title": "{{ post.title }}",
        "url": "{{ post.url }}"
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
]
```
