---
layout: post
title: 读完的书单
category: 橱窗
keywords: 阅读,书单,2022
---



<div class="row" id="book_list"></div>



<script type="text/javascript">


  //1. 读入数据
var url = "https://www.guofei.site/pages/book_list.json";
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var a = JSON.parse(this.responseText);
        book_list.push(a);
    }
};


    var book_list = [];
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    book_list

text=''



for (var i = 0; i < book_list[0].length; i++) {
book = book_list[0][i]
tmp=    `
<div class="col-md-12">
          <div class="panel panel-primary">
            <div class="panel-heading">` + book['书名'] + `</div>
            <div class="panel-body">
              <div class="row">

                <div class="col-md-8 col-xs-12">
                  <table class="table table-bordered">
                    <tbody>

                      <tr><td style="width:80px;">书名</td><td>` + book['书名'] + `</td>
                      <td style="width:80px;">阅毕时间</td><td>` + book['读完时间'] + `</td>
                      </tr>

                      <tr><td style="width:40px;">作者</td><td>` + book['作者'] + `</td>
                      <td style="width:40px;">我的打分</td><td>` + book['打分'] + `</td>
                      </tr>

                      <tr><td>出版商</td><td>` + book['出版商'] + `</td>

                      <td>读书笔记</td><td>


                        <a href="http://www.guofei.site/reading/#" title="http://www.guofei.site/reading/#">点击查看</a>

                      </td>
                      </tr>

                      <tr><td>简评</td><td colspan=" 3 ">` + book['简评'] + `</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
        text += tmp

}
// 写入
    document.getElementById("book_list").innerHTML = text;





</script>
