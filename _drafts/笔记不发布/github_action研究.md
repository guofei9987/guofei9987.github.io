
## GitHub action研究

```yml
name: CI
name: Update README

on:
  schedule:
    - cron: '0 20 * * *'
  watch:
    types: started

jobs:
  top-followers:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup python
        uses: actions/setup-python@v2
        with:
          python-version: 3.8
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
      - name: Update README
        run: |
          python src/get_about.py
      - name: Commit changes
        run: |
          git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add -A
          git diff-index --quiet HEAD || git commit -m "Update top followers"
      - name: Pull changes
        run: git pull -r
      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```


## on


```yml
on:
  push:
    branches: ["master"]
  schedule:
      - cron: '0 23 * * *'
  watch:
    types: started

on:
  push:
    # Sequence of patterns matched against refs/heads
    branches:    
      - master         # Push events on master branch
      - 'releases/*'   # Push events to branches matching refs/heads/releases/*
      - '!refs/pull/*' # Push events on branches that do not match refs/pull/*
    # Sequence of patterns matched against refs/tags
    tags:        
      - v1             # Push events to v1 tag
      - v1.0           # Push events to v1.0 tag
```




```yml
on: [push, pull_request] # 或者的关系，任意一个满足条件，即可触发
```



可以设定路径
```yml
# run on pushes which modify at least one file that doesn't have the .js extension
on:
  push:
    paths:
    - '*'    
    - '!*.js'
```


其它 events：https://help.github.com/en/articles/events-that-trigger-workflows#scheduled-events  
几个常用的：
- fork
- issue_comment
  - created
  - edited
  - deleted
  - 。。。



## job
```
jobs:
  my_first_job:
    name: My first job
  my_second_job:
    name: My second job
```
### needs：设定先后顺序
```
# job1 must complete successfully before job2 begins, and job3 waits for both job1 and job2 to complete.
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```
### jobs.<job_id>.runs-on：设定环境

- ubuntu-latest, ubuntu-18.04, or ubuntu-16.04
- windows-latest, windows-2019, or windows-2016
- macOS-latest or macOS-10.14

#### jobs.<job_id>.steps ：具体步骤

```
name: Greeting from Mona

on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
    - name: Print a greeting
      env:
        MY_VAR: Hi there! My name is
        FIRST_NAME: Mona
        MIDDLE_NAME: The
        LAST_NAME: Octocat
      run: |
        echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```

- jobs.<job_id>.steps.name
- jobs.<job_id>.steps.id
- jobs.<job_id>.steps.if
- jobs.<job_id>.steps.uses


## 发布为 GitHub Pages


先上传到 artifact，并且名字命名为 “github-pages”

```
- name: Upload artifact
  uses: actions/upload-pages-artifact@v1
  with:
    name: github-pages
    path: ./_site/

```


然后部署

```
  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```


## API：图片



[![Stars](https://img.shields.io/github/stars/guofei9987/scikit-opt.svg?label=Stars&style=social)](https://github.com/guofei9987/scikit-opt/stargazers)
[![Forks](https://img.shields.io/github/forks/guofei9987/scikit-opt.svg?label=Fork&style=social)](https://github.com/guofei9987/scikit-opt/network/members)
![Watchers](https://img.shields.io/github/watchers/guofei9987/scikit-opt?style=social)

![](https://img.shields.io/sourcegraph/rrc/github.com/guofei9987/scikit-opt)
[![Contributors](https://img.shields.io/github/contributors/guofei9987/scikit-opt.svg)](https://github.com/guofei9987/scikit-opt/graphs/contributors)
[![License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)




个人的：
[![Followers](https://img.shields.io/github/followers/guofei9987?style=social)](https://github.com/guofei9987)



github.com/guofei9987/scikit-opt

## API：接口

个人：https://api.github.com/users/guofei9987



仓库API：https://api.github.com/users/guofei9987/repos
