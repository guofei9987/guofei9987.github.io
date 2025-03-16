---
layout: open_source
title: 文本隐水印
categories: 开源
tag: Watermark
order: 205
repo_name: blind_watermark
---

<style>
    body {
        font-size: 12px;
        font-family: Sans-Serif;
    }

    h2,h3 {
        margin: 0.5em 0 0.1em;
        text-align: center;
    }

    .top {
        text-align: center;
    }

    .textInput {
        display: block;
    }

    .textOutput {
        display: block;
    }

    textarea {
        width: 100%;
        height: 300px;
    }

    label:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>



<h2 class="top">设置密码</h2>
<div class="top">
    <strong>密码：</strong>
    <input id="password" type="text" name="" value="" placeholder="请输入密码">
</div>

<hr>

<h2 class="top">1. 把隐水印嵌入到明文</h2>
<table width="100%">
    <tr>
        <td width="48%">
            <div class="textInput">
                <strong>需要隐藏的密文：</strong>
                <input id="wm" type="text" name="" value="">

                <h3>作为掩护的明文</h3>
                <textarea id="baseText"></textarea>
            </div>
        </td>

        <td width="4%" align="middle">
            <button type="button" id="embedBtn">embed=&gt;</button>
        </td>

        <td width="48%">
            <div class="textOutput">
                <h3>嵌入密文后的明文</h3>
                <textarea id="newText" readonly="readonly"></textarea>
            </div>
        </td>
    </tr>
</table>

<hr>
<h2 class="top">2. 提取隐水印</h2>

<table>
    <tr>
        <td>
            <h3>嵌入密文后的明文</h3>
            <textarea id="text_embed2"></textarea>
        </td>

        <td width="4%" align="middle">
            <button type="button" id="extractBtn">extract=&gt;</button>
        </td>

        <td>
            <h3>解出的密文</h3>
            <textarea id="wm_extract" readonly="readonly"></textarea>
        </td>
    </tr>
</table>

<hr>




<script type="module">
    import init, { Watermarker } from "./pkg/wasm_text_watermark.js";

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