
```
# pip install PyMuPDF

# 保存pdf的所有图片

import fitz  # 导入 PyMuPDF

# PDF 文件路径，请替换为你的 PDF 文件路径
pdf_path = "3691626.pdf"



# 打开 PDF 文件
doc = fitz.open(pdf_path)

# 遍历 PDF 中的每一页
for page_index in range(len(doc)):
    page = doc[page_index]
    # 获取当前页中所有图片信息，参数 full=True 会返回更多详细信息
    image_list = page.get_images(full=True)
    print(f"第 {page_index+1} 页, 图片数量: {len(image_list)}")

    # 遍历当前页中的每个图片
    for image_index, img in enumerate(image_list, start=1):
        xref = img[0]  # xref 是图片的引用编号
        base_image = doc.extract_image(xref)  # 提取图片信息
        image_bytes = base_image["image"]      # 图片的二进制数据
        image_ext = base_image["ext"]          # 图片扩展名，例如 'png' 或 'jpeg'

        # 构造图片保存的文件名，例如 page1_img1.png
        image_filename = f"page{page_index+1}_img{image_index}.{image_ext}"
        with open(image_filename, "wb") as f:
            f.write(image_bytes)
        print(f"已保存: {image_filename}")

print("所有图片提取完毕！")
```
