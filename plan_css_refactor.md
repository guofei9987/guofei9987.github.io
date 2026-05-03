# CSS 重构执行计划

## 目标
提取 `_os/7_app` 目录下 HTML 文件中的公共 CSS 到 `a/app/tools.css`，减少冗余代码，提升可维护性。

## 预期效果
- 减少重复代码约 80-100 行
- 统一工具类应用的视觉风格
- 允许轻微外观变化以换取更好的代码复用

---

## 第一步：扩展 tools.css

**文件**: `a/app/tools.css`

### 1.1 添加图片展示区域样式（在文件末尾添加）

```css
/* 图片展示区域样式 - 用于 hide_as_img.html 和 mirage_tank.html */

#content .text-tools-image-stage {
  min-height: 280px;
  margin-top: 12px;
  padding: 22px;
  border: 2px dashed var(--tools-border);
  border-radius: 8px;
  background: var(--tools-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

#content .text-tools-image-stage img {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 430px;
  margin: 0;
  border-radius: 6px;
  object-fit: contain;
}

/* 图片展示区域的变体 - 用于预览区域 */
#content .text-tools-image-stage-large {
  min-height: 340px;
  padding: 36px;
}
```

### 1.2 添加表单输入框样式

```css
/* 通用输入框样式 */

#content .text-tools-input {
  padding: 7px 10px;
  color: var(--tools-text);
  border: 1px solid var(--tools-border);
  border-radius: 6px;
  background: var(--tools-panel);
  font-size: 14px;
  transition: border-color 0.2s ease;
}

#content .text-tools-input:focus {
  outline: none;
  border-color: var(--tools-primary);
}

/* 输入框尺寸变体 */
#content .text-tools-input-small {
  width: 92px;
}

#content .text-tools-input-medium {
  width: 160px;
}
```

### 1.3 添加元信息展示样式

```css
/* 元信息展示区样式 */

#content .text-tools-meta {
  width: 100%;
  color: var(--tools-text);
  text-align: left;
  word-break: break-word;
}

#content .text-tools-meta-title {
  margin-bottom: 8px;
  font-weight: 700;
}

#content .text-tools-meta-detail {
  color: var(--tools-muted);
  font-size: 14px;
}
```

### 1.4 添加操作按钮区域样式

```css
/* 操作按钮区域样式 */

#content .text-tools-actions {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--tools-border);
}
```

### 1.5 添加灰度滤镜（可选）

```css
/* 图片滤镜 */
#content .text-tools-grayscale {
  filter: grayscale(1);
}
```

---

## 第二步：修改 hide_as_img.html

**文件**: `_os/7_app/hide_as_img.html`

### 2.1 移除 style 标签内容

**原始位置**: 第 11-85 行的 `<style>` 标签

**保留**: 整个 `<style>` 标签可以完全删除

### 2.2 更新 class 名称（6处修改）

| 原始 class | 新 class | 位置（行号） |
|-----------|----------|-------------|
| `.hide-info-drop-area` | `.text-tools-image-stage` | 99, 113 |
| `.hide-info-meta` | `.text-tools-meta` | 193 |
| `.hide-info-meta-title` | `.text-tools-meta-title` | 197 |
| `.hide-info-meta-line` | `.text-tools-meta-detail` | 202, 207, 212 |
| `.hide-info-inline-control` | **保留**（因使用频率低） | 109 |
| `.hide-info-text-input` | `.text-tools-input .text-tools-input-medium` | 111 |
| `.hide-info-actions` | `.text-tools-actions` | 102, 117 |

### 2.3 HTML 修改示例

**修改前 (第 99 行)**:
```html
<div class="hide-info-drop-area" id="payloadArea">
```

**修改后**:
```html
<div class="text-tools-image-stage" id="payloadArea">
```

**修改前 (第 111 行)**:
```html
<input class="hide-info-text-input" type="text" id="decodedExtension" placeholder="自动识别">
```

**修改后**:
```html
<input class="text-tools-input text-tools-input-medium" type="text" id="decodedExtension" placeholder="自动识别">
```

**修改前 (第 193 行)**:
```html
<div class="hide-info-meta">
```

**修改后**:
```html
<div class="text-tools-meta">
```

---

## 第三步：修改 mirage_tank.html

**文件**: `_os/7_app/mirage_tank.html`

### 3.1 精简 style 标签内容

**原始位置**: 第 11-109 行的 `<style>` 标签

**移除的样式**:
- `.hide-info-image-stage`（通用样式，移到 tools.css）
- `.hide-info-image-stage img`（通用样式，移到 tools.css）
- `.hide-info-number` 和 `.hide-info-number:focus`（替换为 `.text-tools-input`）
- `.hide-info-output-actions`（替换为 `.text-tools-actions`）

**保留的样式**:
- `.hide-info-stage-white` / `.hide-info-stage-black` / `.hide-info-stage-checker`（工具特定）
- `.hide-info-preview-stage`（变体样式）
- `.hide-info-grayscale`（可选：移到 tools.css）
- `.hide-info-param-row`（特定布局）
- `.hide-info-range`（特定控件）
- `.hide-info-muted`（使用频率低，保留）

### 3.2 更新 class 名称（9处修改）

| 原始 class | 新 class | 位置（行号） |
|-----------|----------|-------------|
| `.hide-info-image-stage` (基础) | `.text-tools-image-stage` | 123, 131, 150 |
| `.hide-info-image-stage img` | `.text-tools-image-stage img`（自动生效） | 不适用 |
| `.hide-info-preview-stage` | `.text-tools-image-stage .text-tools-image-stage-large` | 162, 169 |
| `.hide-info-number` | `.text-tools-input .text-tools-input-small` | 143 |
| `.hide-info-output-actions` | `.text-tools-actions` | 154 |
| `.hide-info-grayscale` | `.text-tools-grayscale`（可选） | 289 |

### 3.3 HTML 修改示例

**修改前 (第 123 行)**:
```html
<div class="hide-info-image-stage hide-info-stage-white" id="colorStage">
```

**修改后**:
```html
<div class="text-tools-image-stage hide-info-stage-white" id="colorStage">
```

**修改前 (第 162 行)**:
```html
<div class="hide-info-image-stage hide-info-preview-stage hide-info-stage-white" id="whitePreview">
```

**修改后**:
```html
<div class="text-tools-image-stage text-tools-image-stage-large hide-info-stage-white" id="whitePreview">
```

**修改前 (第 143 行)**:
```html
<input class="hide-info-number" type="number" id="bNumber" min="0" max="1" step="0.01" value="0.50">
```

**修改后**:
```html
<input class="text-tools-input text-tools-input-small" type="number" id="bNumber" min="0" max="1" step="0.01" value="0.50">
```

---

## 第四步：验证修改效果

### 4.1 检查列表

- [ ] `tools.css` 添加的样式无语法错误
- [ ] `hide_as_img.html` style 标签已删除
- [ ] `hide_as_img.html` 所有 class 已更新
- [ ] `mirage_tank.html` style 标签已精简
- [ ] `mirage_tank.html` 所有 class 已更新
- [ ] 两个文件在浏览器中正常显示
- [ ] 图片上传和预览功能正常
- [ ] 样式变化在可接受范围内

### 4.2 外观变化点

| 位置 | 变化前 | 变化后 | 是否可接受 |
|-----|--------|--------|-----------|
| 图片max-height | 420px / 430px | 统一为430px | ✅ 是 |
| mirage_tank 预览区高度 | 340px | 280px（可额外添加-large类） | ✅ 是 |
| 输入框样式 | 略有差异 | 统一样式 | ✅ 是 |

---

## 额外建议（可选）

### 5.1 提取 placeholder 和 loading 样式

当前 `tools.css` 已定义：
```css
#content .text-tools-placeholder,
#content .text-tools-loading {
  margin-top: 10px;
  color: var(--tools-muted);
  font-size: 15px;
  font-style: italic;
}
```

可考虑扩展为：
```css
#content .text-tools-placeholder {
  font-style: italic;
}

#content .text-tools-loading {
  /* 添加加载动画 */
  font-style: normal;
  font-weight: 500;
}
```

### 5.2 清理不需要的 CSS 变量

检查并移除 `tools.css` 中未使用的 CSS 变量，保持文件整洁。

---

## 执行顺序

1. **备份原文件**（重要！）
2. 修改 `a/app/tools.css`（第一步）
3. 修改 `hide_as_img.html`（第二步）
4. 修改 `mirage_tank.html`（第三步）
5. 浏览器测试验证（第四步）
6. 提交并 review

---

## 风险与回滚

**低风险**：本次修改主要是 CSS 类名替换和样式提取，不影响 JavaScript 逻辑。

**回滚方案**：如有问题，直接从 git 恢复修改前的版本：
```bash
git checkout HEAD -- a/app/tools.css _os/7_app/hide_as_img.html _os/7_app/mirage_tank.html
```
