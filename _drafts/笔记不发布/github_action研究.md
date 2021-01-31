
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

### 个人
https://api.github.com/users/guofei9987

包含信息
```json
{
  "login": "guofei9987",
  "id": 19920283,
  "node_id": "MDQ6VXNlcjE5OTIwMjgz",
  "avatar_url": "https://avatars2.githubusercontent.com/u/19920283?v=4",  // 头像
  "gravatar_id": "",
  "url": "https://api.github.com/users/guofei9987", //API地址
  "html_url": "https://github.com/guofei9987", // github地址
  "followers_url": "https://api.github.com/users/guofei9987/followers", // 关注这个人的，也是个json，格式与这个一模一样
  "following_url": "https://api.github.com/users/guofei9987/following{/other_user}", // 这个人关注的
  "gists_url": "https://api.github.com/users/guofei9987/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/guofei9987/starred{/owner}{/repo}", // 这个人 star 的
  "subscriptions_url": "https://api.github.com/users/guofei9987/subscriptions", // 这个人 watch 的
  "organizations_url": "https://api.github.com/users/guofei9987/orgs", // 这个人所在的 organizations
  "repos_url": "https://api.github.com/users/guofei9987/repos", // 这个人名下的仓库
  "events_url": "https://api.github.com/users/guofei9987/events{/privacy}", // 这个人的时间线，push watch 之类的
  "received_events_url": "https://api.github.com/users/guofei9987/received_events", // 这个人时间线上的信息（别人的）
  "type": "User",
  "site_admin": false,
  "name": "郭飞",
  "company": null,
  "blog": "http://www.guofei.site",
  "location": "北京",
  "email": null,
  "hireable": null,
  "bio": "neural network", // 签名
  "public_repos": 46, // 仓库个数
  "public_gists": 1, // gist 个数
  "followers": 43, // 关注这个人的个数
  "following": 21, // 这个人关注的
  "created_at": "2016-06-14T02:25:00Z", // 建号时间
  "updated_at": "2019-09-08T13:35:56Z" // 更新时间？不知道啥意思
}
```


### 仓库API
```json
{
   "id": 115424488,
   "node_id": "MDEwOlJlcG9zaXRvcnkxMTU0MjQ0ODg=",
   "name": "scikit-learn",
   "full_name": "guofei9987/scikit-learn",
   "private": false,
   "owner": {
     "login": "guofei9987",
     "id": 19920283,
     "node_id": "MDQ6VXNlcjE5OTIwMjgz",
     "avatar_url": "https://avatars2.githubusercontent.com/u/19920283?v=4",
     "gravatar_id": "",
     "url": "https://api.github.com/users/guofei9987",
     "html_url": "https://github.com/guofei9987",
     "followers_url": "https://api.github.com/users/guofei9987/followers",
     "following_url": "https://api.github.com/users/guofei9987/following{/other_user}",
     "gists_url": "https://api.github.com/users/guofei9987/gists{/gist_id}",
     "starred_url": "https://api.github.com/users/guofei9987/starred{/owner}{/repo}",
     "subscriptions_url": "https://api.github.com/users/guofei9987/subscriptions",
     "organizations_url": "https://api.github.com/users/guofei9987/orgs",
     "repos_url": "https://api.github.com/users/guofei9987/repos",
     "events_url": "https://api.github.com/users/guofei9987/events{/privacy}",
     "received_events_url": "https://api.github.com/users/guofei9987/received_events",
     "type": "User",
     "site_admin": false
   },
   "html_url": "https://github.com/guofei9987/scikit-learn",
   "description": "scikit-learn: machine learning in Python",
   "fork": true,
   "url": "https://api.github.com/repos/guofei9987/scikit-learn",
   "forks_url": "https://api.github.com/repos/guofei9987/scikit-learn/forks",
   "keys_url": "https://api.github.com/repos/guofei9987/scikit-learn/keys{/key_id}",
   "collaborators_url": "https://api.github.com/repos/guofei9987/scikit-learn/collaborators{/collaborator}",
   "teams_url": "https://api.github.com/repos/guofei9987/scikit-learn/teams",
   "hooks_url": "https://api.github.com/repos/guofei9987/scikit-learn/hooks",
   "issue_events_url": "https://api.github.com/repos/guofei9987/scikit-learn/issues/events{/number}",
   "events_url": "https://api.github.com/repos/guofei9987/scikit-learn/events",
   "assignees_url": "https://api.github.com/repos/guofei9987/scikit-learn/assignees{/user}",
   "branches_url": "https://api.github.com/repos/guofei9987/scikit-learn/branches{/branch}",
   "tags_url": "https://api.github.com/repos/guofei9987/scikit-learn/tags",
   "blobs_url": "https://api.github.com/repos/guofei9987/scikit-learn/git/blobs{/sha}",
   "git_tags_url": "https://api.github.com/repos/guofei9987/scikit-learn/git/tags{/sha}",
   "git_refs_url": "https://api.github.com/repos/guofei9987/scikit-learn/git/refs{/sha}",
   "trees_url": "https://api.github.com/repos/guofei9987/scikit-learn/git/trees{/sha}",
   "statuses_url": "https://api.github.com/repos/guofei9987/scikit-learn/statuses/{sha}",
   "languages_url": "https://api.github.com/repos/guofei9987/scikit-learn/languages",
   "stargazers_url": "https://api.github.com/repos/guofei9987/scikit-learn/stargazers",
   "contributors_url": "https://api.github.com/repos/guofei9987/scikit-learn/contributors",
   "subscribers_url": "https://api.github.com/repos/guofei9987/scikit-learn/subscribers",
   "subscription_url": "https://api.github.com/repos/guofei9987/scikit-learn/subscription",
   "commits_url": "https://api.github.com/repos/guofei9987/scikit-learn/commits{/sha}",
   "git_commits_url": "https://api.github.com/repos/guofei9987/scikit-learn/git/commits{/sha}", // 这里面信息很多
   "comments_url": "https://api.github.com/repos/guofei9987/scikit-learn/comments{/number}",
   "issue_comment_url": "https://api.github.com/repos/guofei9987/scikit-learn/issues/comments{/number}",
   "contents_url": "https://api.github.com/repos/guofei9987/scikit-learn/contents/{+path}",
   "compare_url": "https://api.github.com/repos/guofei9987/scikit-learn/compare/{base}...{head}",
   "merges_url": "https://api.github.com/repos/guofei9987/scikit-learn/merges",
   "archive_url": "https://api.github.com/repos/guofei9987/scikit-learn/{archive_format}{/ref}",
   "downloads_url": "https://api.github.com/repos/guofei9987/scikit-learn/downloads",
   "issues_url": "https://api.github.com/repos/guofei9987/scikit-learn/issues{/number}",
   "pulls_url": "https://api.github.com/repos/guofei9987/scikit-learn/pulls{/number}",
   "milestones_url": "https://api.github.com/repos/guofei9987/scikit-learn/milestones{/number}",
   "notifications_url": "https://api.github.com/repos/guofei9987/scikit-learn/notifications{?since,all,participating}",
   "labels_url": "https://api.github.com/repos/guofei9987/scikit-learn/labels{/name}",
   "releases_url": "https://api.github.com/repos/guofei9987/scikit-learn/releases{/id}",
   "deployments_url": "https://api.github.com/repos/guofei9987/scikit-learn/deployments",
   "created_at": "2017-12-26T13:27:00Z",
   "updated_at": "2018-10-09T08:49:48Z",
   "pushed_at": "2018-10-09T08:48:09Z",
   "git_url": "git://github.com/guofei9987/scikit-learn.git",
   "ssh_url": "git@github.com:guofei9987/scikit-learn.git",
   "clone_url": "https://github.com/guofei9987/scikit-learn.git",
   "svn_url": "https://github.com/guofei9987/scikit-learn",
   "homepage": "http://scikit-learn.org",
   "size": 94784,
   "stargazers_count": 0, // star 数量
   "watchers_count": 0, // watch 数量
   "language": "Python",
   "has_issues": false,
   "has_projects": true,
   "has_downloads": true,
   "has_wiki": true,
   "has_pages": false,
   "forks_count": 0, // fork 数量
   "mirror_url": null,
   "archived": false,
   "disabled": false,
   "open_issues_count": 0,
   "license": {
     "key": "other",
     "name": "Other",
     "spdx_id": "NOASSERTION",
     "url": null,
     "node_id": "MDc6TGljZW5zZTA="
   },
   "forks": 0,
   "open_issues": 0,
   "watchers": 0,
   "default_branch": "master"
 },
 ```
