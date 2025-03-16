docker run --rm \
    --platform linux/amd64 \
    --label=jekyll \
    --volume /Users/guofei/github/guofei9987.github.io:/srv/jekyll/blog_md_dir \
    -it -p 127.0.0.1:4006:4000 my-jekyll \
    jekyll serve --force_polling \
    --destination /srv/jekyll/blog --source /srv/jekyll/blog_md_dir