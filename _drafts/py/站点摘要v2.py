# 数据源

data_source_list=[
    'https://www.guofei.site/tags.json',
    'https://www.guofei.site/reading.json',
    'https://www.guofei.site/os.json',
    'https://www.guofei.site/me.html',
    "https://www.guofei.site/api/book_list.json",
    "https://www.guofei.site/api/certification.json",
    "https://www.guofei.site/api/cnt_github_repo.json",
]


import requests
from bs4 import BeautifulSoup
from pathlib import Path
import os




def download_file(url, output_dir="."):
    p = Path(url)
    if p.exists():  # 本地文件
        dst = Path(output_dir) / p.name
        dst.write_bytes(p.read_bytes())
        print(f"Copied local file: {dst}")
        return

    fname = Path(output_dir) / os.path.basename(url)
    r = requests.get(url)
    r.raise_for_status()

    # 特殊处理 me.html
    if url.endswith("me.html"):
        soup = BeautifulSoup(r.text, 'lxml')
        about = soup.find(name='div', attrs={"id": "page-content"})
        if about:
            with open("me.md", "w", encoding="utf-8") as f:
                f.write("## 个人介绍\n\n")
                f.write(about.decode_contents())
                f.write("\n\n")
            print("个人介绍已保存到 me.md")
        else:
            fname.write_text(r.text, encoding="utf-8")
    else:
        fname.write_text(r.text, encoding="utf-8")
        print(f"Downloaded: {fname}")

if __name__ == "__main__":
    for url in data_source_list:
        try:
            download_file(url)
        except Exception as e:
            print(f"Failed to process {url}: {e}")