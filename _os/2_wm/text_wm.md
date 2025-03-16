---
layout: open_source
title: 文本隐水印
categories: 开源
tag: Watermark
order: 205
repo_name: blind_watermark
---

<style>
    textarea {
        width: 98%;
        height: 200px;
    }
    .middle {
        text-align: center;
    }
    th,td{
        text-align: center;
    }
</style>



<h4 class="middle">0. 设置密码</h4>
<div class="middle">
    <strong>密码*：</strong>
    <input id="password" type="text" name="" value="" placeholder="请输入密码">
</div>

<hr>

<h4 class="middle">1. 把隐水印嵌入到明文</h4>

<table width="100%">
  <tr>
    <th>密文和载体</th>
    <th rowspan="3" width="4%"> <button type="button" id="embedBtn">embed=&gt;</button></th>
    <th>嵌入后的载体</th>
  </tr>
  <tr>
    <td>
      <strong>密文：</strong>
      <input id="wm" type="text" name="" value="" placeholder="请输入密文">
    </td>
    <td></td>
  </tr>
    <tr>
        <td width="45%">
            <textarea id="baseText" placeholder="请输入明文"></textarea>
        </td>
        <td width="45%">
            <textarea id="newText" readonly ></textarea>
        </td>
    </tr>
</table>



<hr>

<h4 class="middle">2. 提取隐水印</h4>

<table>
  <tr>
    <th>嵌入密文后的载体</th>
    <th rowspan="2" width="4%"><button type="button" id="extractBtn">extract=&gt;</button></th>
    <th>解出的密文</th>
  </tr>
    <tr>
        <td>
            <textarea id="text_embed2" placeholder="请输入嵌入后的载体"></textarea>
        </td>
        <td>
            <textarea id="wm_extract" readonly></textarea>
        </td>
    </tr>
</table>

<hr>




<script type="module">
    import init, { Watermarker } from "/a/app/hidden_watermark/pkg/wasm_text_watermark.js";

    async function run() {
        await init();

        let watermarker = null; // Watermarker 实例

        // 获取 DOM 元素
        const passwordInput = document.getElementById("password");
        const embedBtn = document.getElementById("embedBtn");
        const extractBtn = document.getElementById("extractBtn");

        // 初始化 Watermarker 实例
        function createWatermarker(password) {
            try {
                return new Watermarker(password);
            } catch (e) {
                console.error("初始化 Watermarker 失败:", e);
                alert("密码无效，请重新输入！");
                return null;
            }
        }

        passwordInput.addEventListener("change", () => {
            const password = passwordInput.value;
            if (password) {
                watermarker = createWatermarker(password);
            } else {
                alert("密码不能为空！");
            }
        });

        embedBtn.addEventListener("click", () => {
            if (!watermarker) {
                alert("请先设置密码！");
                return;
            }

            const wm = document.getElementById("wm").value;
            const baseText = document.getElementById("baseText").value;

            if (!wm) {
                alert("请输入需要隐藏的密文！");
                return;
            }

            if (!baseText) {
                alert("请输入作为掩护的明文！");
                return;
            }

            try {
                const textWithWm = watermarker.embed(baseText, wm);
                document.getElementById("newText").value = textWithWm;
            } catch (e) {
                console.error(e);
                alert("嵌入水印时出错！");
            }
        });

        extractBtn.addEventListener("click", () => {
            if (!watermarker) {
                alert("请先设置密码！");
                return;
            }

            const textWithWm = document.getElementById("text_embed2").value;

            if (!textWithWm) {
                alert("请输入嵌入水印后的明文！");
                return;
            }

            try {
                const extractedWm = watermarker.extract(textWithWm);
                document.getElementById("wm_extract").value = extractedWm;
            } catch (e) {
                console.error(e);
                alert("提取水印时出错！");
            }
        });
    }

    run();
</script>


## Source Code

|Rust|Python|Javascript|
|--|--|--|
|[![](https://www.guofei.site/public/icon/hidden_watermark.svg)](https://github.com/guofei9987/hidden_watermark)|[![](https://www.guofei.site/public/icon/text_blind_watermark.svg)](https://github.com/guofei9987/text_blind_watermark) | [javascript](https://www.guofei.site/pictures_for_blog/app/text_watermark/v1.html)


## How to use

[https://www.bilibili.com/video/BV1m3411s7kT](https://www.bilibili.com/video/BV1m3411s7kT)