#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import sys
import glob
import yaml
from pathlib import Path

POSTS_DIR = Path("./_posts")
OUTPUT_MD = Path("site_snapshot.md")   # 仅生成“技术博客”这一节

# --- 简单工具 ---

def read_text_strict(p: Path) -> str:
    # 严格按 UTF-8 读取；失败直接抛异常
    with p.open("r", encoding="utf-8") as f:
        return f.read()

def parse_front_matter_and_body(text: str):
    """
    解析 Jekyll Front-Matter:
    以文件开头的 '---' 开始，到下一个单独一行的 '---' 结束。
    返回: (meta: dict, body_text: str)
    若结构异常/解析失败 -> 抛异常
    """
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError("Missing YAML front-matter opening '---'")

    # 找到结束行
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx is None:
        raise ValueError("Missing YAML front-matter closing '---'")

    yaml_block = "\n".join(lines[1:end_idx])
    try:
        meta = yaml.safe_load(yaml_block) or {}
        if not isinstance(meta, dict):
            raise ValueError("Front-matter is not a mapping")
    except Exception as e:
        raise ValueError(f"YAML parse error: {e}")

    body = "\n".join(lines[end_idx+1:])
    return meta, body

def extract_h2_from_markdown(body: str):
    """
    仅提取 Markdown ATX 形式的二级标题：行首 '## '。
    忽略 fenced code block (``` 或 ~~~) 内部内容。
    返回按出现顺序的列表。
    """
    h2_list = []
    in_code = False
    fence_re = re.compile(r"^(```|~~~)")
    h2_re = re.compile(r"^##\s+(.*)$")

    for line in body.splitlines():
        if fence_re.match(line.strip()):
            in_code = not in_code
            continue
        if in_code:
            continue
        m = h2_re.match(line)
        if m:
            title = m.group(1).strip()
            # 去掉行尾的井号收尾（如 "## 标题 ##" 的收尾装饰）
            title = re.sub(r"\s#+\s*$", "", title).strip()
            h2_list.append(title)
    return h2_list

def escape_pipes(s: str) -> str:
    return s.replace("|", r"\|")

# --- 核心流程 ---

def collect_posts():
    """
    遍历 _posts 下所有 .md，抽取 {title, tags, size, h2s}
    规则：
      - title 必须存在，否则报错退出
      - tags 可能缺失，用 '未标注'
      - size = 文件字节数
      - h2s = 纯 Markdown '## ' 标题（忽略代码块）
    """
    pattern = str(POSTS_DIR / "**" / "*.md")
    files = sorted(glob.glob(pattern, recursive=True))
    results = []

    for fpath in files:
        print(f"正在处理 {fpath} ...")
        p = Path(fpath)
        try:
            raw = read_text_strict(p)
            meta, body = parse_front_matter_and_body(raw)
        except Exception as e:
            # 严格：任何解析问题直接退出
            print(f"[ERROR] {p}: {e}", file=sys.stderr)
            sys.exit(1)

        title = meta.get("title")
        if not title or not isinstance(title, str):
            print(f"[ERROR] {p}: missing or invalid 'title' in front-matter", file=sys.stderr)
            sys.exit(1)

        tags = meta.get("tags")
        if tags is None or not isinstance(tags, str) or not tags.strip():
            tags = "未标注"

        size = p.stat().st_size
        h2s = extract_h2_from_markdown(body)

        results.append({
            "path": str(p),
            "title": title.strip(),
            "tags": tags.strip(),
            "size": size,
            "h2s": h2s,
        })

    # 按 tags 升序（字典序）排序
    results.sort(key=lambda r: r["tags"])
    return results

def build_markdown_table(rows):
    """
    生成 “技术博客”表格 + 总览行 的 Markdown 文本（不含前置标题）
    """
    lines = []
    lines.append("| 标题 | Tags | 文件大小（字节） | H2（二级标题） |")
    lines.append("|---|---|---:|---|")

    total_size = 0
    for r in rows:
        total_size += r["size"]
        title = escape_pipes(r["title"])
        tags = escape_pipes(r["tags"])
        size_str = f"{r['size']:,}"
        h2_joined = "；".join(escape_pipes(h) for h in r["h2s"]) if r["h2s"] else ""
        lines.append(f"| {title} | {tags} | {size_str} | {h2_joined} |")

    lines.append(f"\n**共 {len(rows)} 篇，总大小 {total_size:,} 字节**")
    return "\n".join(lines)

def main():
    rows = collect_posts()

    md = []
    md.append("## 技术博客")
    md.append(build_markdown_table(rows))
    md.append("")  # 末尾空行

    # 覆盖写入（当前仅生成这一节）
    OUTPUT_MD.write_text("\n".join(md), encoding="utf-8")
    print(f"✅ 已生成 {OUTPUT_MD}（仅包含“技术博客”小节）")

if __name__ == "__main__":
    main()
