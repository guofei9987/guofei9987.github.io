---
layout: page
title: 关于
---





### Hi there 👋


- 👯 目前在蚂蚁集团-天堑实验室任算法专家。
- 👆曾任：京东集团-Y事业部动态定价算法专家。中体彩彩票运营管理有限公司-竞猜类彩票建模师。某私募基金分析员。某银行实习员工。
- 🧮 热爱算法和开源。2021年，“毅力号”携带的“才智号”在火星起飞，实现了[人类首次在另一个星球的动力飞行](https://github.com/readme/featured/nasa-ingenuity-helicopter)，本人因其中的开源贡献被 NASA 授予 [徽章](https://github.com/guofei9987?achievement=mars-2020-contributor&tab=achievements)
- 🔭 技术积累：[技术博客](https://www.guofei.site/) 累积 {{ site.posts.size }} 篇
- 📖 喜欢读书：[读书笔记](https://www.guofei.site/reading/#/) {{ site.data.cnt_reading_words.cnt_reading_words }}，读书 {{ site.data.book_list.size }} 本
- 🤔 one of 121 [authors](https://github.com/scipy/scipy/issues/7798) in [scipy 1.0.0](https://github.com/scipy/scipy/releases/tag/v1.0.0)
- 📚 学术期刊 [Journal of Finance and Accounting](http://www.sciencepublishinggroup.com/journal/index?journalid=171) **[审稿员](https://www.guofei.site/pages/certification.html#Reviewer)**
- 🏃 爱好运动，能做 30 个 <b><a href="https://www.bilibili.com/video/BV1L64y1t7Ef/" target="_blank">单手俯卧撑</a></b>
- 📫 <a href="https://www.zhihu.com/people/guo-fei-16-12/answers/by_votes" target="_blank"><img alt="Blog Counts" src="https://www.guofei.site/guofei9987/zhihu.svg"></a>


<a href="https://www.guofei.site/"><img  alt="guofei's stats"  src="https://www.guofei.site/pages/trophy.svg"></a>

-------------------

我的项目：

<table>
<tr>
  <th>Project</th>
  <th>Star</th>
  <th>Fork</th>
  <th>description</th>
</tr>

{% assign sorted_repos = (site.github.public_repositories | sort: 'stargazers_count') | reverse | where: "fork", "false" %}
{% for repo in sorted_repos | limit: site.side_bar_repo_limit %}
<tr>
  <td><a href="{{ repo.html_url }}">{{ repo.name }}</a></td>
  <td>☆{{ repo.stargazers_count }}</td>
  <td><img alt="fork:" src="https://www.guofei.site/public/icon/fork.svg">{{ repo.forks_count }}</td>
  <td>{{ repo.description | truncate:30 }}</td>
</tr>
{% endfor %}
</table>

---------------------

[![scikit-opt](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=scikit-opt&theme=radical)](https://github.com/guofei9987/scikit-opt)
[![blind_watermark](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=blind_watermark&theme=radical)](https://github.com/guofei9987/blind_watermark)
[![text_blind_watermark](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=text_blind_watermark&theme=radical)](https://github.com/guofei9987/text_blind_watermark)
[![guofei9987.github.io](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=guofei9987.github.io&theme=radical)](https://github.com/guofei9987/guofei9987.github.io)
[![fourier_artist](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=fourier_artist&theme=radical)](https://github.com/guofei9987/fourier_artist)
[![pyLSHash](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=pyLSHash&theme=radical)](https://github.com/guofei9987/pyLSHash)
[![github_star_counter](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=github_star_counter&theme=radical)](https://github.com/guofei9987/github_star_counter)
[![plot2svg](https://github-readme-stats.vercel.app/api/pin/?username=guofei9987&repo=plot2svg&theme=radical)](https://github.com/guofei9987/plot2svg)

--------------------

{% assign sorted_repos = (site.github.public_repositories | sort: 'stargazers_count') | reverse | where: "name", "scikit-opt" %}
{% for repo in sorted_repos | limit: 1 %}
<a href="{{ repo.html_url }}">{{ repo.name }}</a>
{{ repo.stargazers_count }}   
{{ repo.description }}  
{{ repo.forks_count }}
{% endfor %}



-------------------

I contributed to:

[![scipy](https://github-readme-stats.vercel.app/api/pin/?username=scipy&repo=scipy&theme=radical)](https://github.com/scipy/scipy)
[![statsmodels](https://github-readme-stats.vercel.app/api/pin/?username=statsmodels&repo=statsmodels&theme=radical)](https://github.com/guofei9987/statsmodels)

---------------------



如何找到我：  

[<i class="fa fa-github fa-lg" style="color:#16a095;font-size:70px;"></i>](https://github.com/guofei9987/)

![](http://www.guofei.site/public/donate/qr_wechat.jpg)
