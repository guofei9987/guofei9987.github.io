
清爽搜索
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>清爽搜索框</title>
    <style>
        form {
            width: 500px;
            height: 160px;
            padding: 10px 20px 20px;
            text-align: center;
            line-height: 50px;
            border: 1px solid #777777;
        }
    </style>
</head>
<body>

<div align="center">
	<form target="_blank">
        <input type="text" name="q" size="38" />
        <br>
        <input type="submit" formmethod="GET" formaction="https://www.zhihu.com/search?type=content" value="知乎一下" />
        <input type="submit" formmethod="GET" formaction="https://www.google.com/search" value="Google" />
        <input type="submit" formmethod="GET" formaction="https://github.com/search" value="GitHub" />

    </form>

<br>


</div>

<div align="center">
  <form action="http://www.baidu.com/s" method="GET" target="_blank" style="height:50px;">
      <input type="text" name="wd" size="38" />
      <input type="submit" value="百度一下" />
  </form>
</div>


</body>
<html>

```
