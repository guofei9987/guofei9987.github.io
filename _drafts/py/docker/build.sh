IMAGE_NAME=my-jekyll

echo "📦 构建镜像：$IMAGE_NAME ..."
docker build -t $IMAGE_NAME .
echo "✅ 构建完成。"