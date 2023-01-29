---
layout: book_lists
title: 读完的书单
category: 橱窗
keywords: 阅读,书单
---


{% for book in site.data.book_list %}

<div class="col-md-12">
          <div class="panel panel-primary">
            <div class="panel-heading">{{ book.name }}</div>
            <div class="panel-body">

                <div class="col-md-8 col-xs-12">
                  <table class="table table-bordered">
                    <tbody>

                      <tr>
                      <td style="width:80px;">书名</td><td>{{ book.name }}</td>
                      <td style="width:80px;">阅毕时间</td><td>{{ book.finish_date }}</td>
                      </tr>

                      <tr>
                      <td>作者</td>
                      <td>{{ book.author }}</td>
                      <td>我的打分</td>
                      <td><font color="red">{{ book.score }}</font></td>
                      </tr>

                      <tr>
                      <td>出版商</td>
                      <td>{{ book.publisher }}</td>
                      <td>读书笔记</td>
                      <td><a href="http://www.guofei.site/reading/#" title="http://www.guofei.site/reading/#">点击查看</a></td>
                      </tr>


                      <tr>
                      <td>简评</td>
                      <td colspan=" 3 ">{{ book.comments }}</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>

{% endfor %}
