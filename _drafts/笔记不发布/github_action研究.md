
## GitHub action研究

```
name: CI

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Run a one-line script
      run: echo Hello, world!
    - name: Run a multi-line script
      run: |
        echo Add other actions to build,
        echo test, and deploy your project.
```

## name
名字，没什么好说的

## on

如何触发。  
可以是string，array，map

例如
```
on: push

on: [push, pull_request] # 或者的关系，任意一个满足条件，即可触发

on:
  push:
    branches:
      - master
```





### on push

可以设定分支

```
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


可以设定路径
```
# run on pushes which modify at least one file that doesn't have the .js extension
on:
  push:
    paths:
    - '*'    
    - '!*.js'
```

### 其它 events
https://help.github.com/en/articles/events-that-trigger-workflows#scheduled-events

摘抄几个常用的
- fork
- issue_comment
  - created
  - edited
  - deleted
  - 。。。
- watch
  - started

```
on:
  watch:
    types: started

```


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
