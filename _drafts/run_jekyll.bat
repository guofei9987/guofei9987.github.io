docker run --rm --label=jekyll --volume /c/Users/guofei8/Desktop/git/GitHub/guofei9987.github.io:/srv/jekyll/blog_md_dir -it -p 127.0.0.1:4006:4000 jekyll/jekyll jekyll serve --force_polling --destination /srv/jekyll/blog --source /srv/jekyll/blog_md_dir