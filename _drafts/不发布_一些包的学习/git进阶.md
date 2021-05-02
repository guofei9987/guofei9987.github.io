
在首页 calendar 上画一个图。  
https://github.com/gelstudios/gitfiti

核心原理是提交时修改时间。方法是根据需求生成很多类似下面的语句。
```
GIT_AUTHOR_DATE=2014-07-10T12:00:00 GIT_COMMITTER_DATE=2014-07-10T12:00:00 git commit --allow-empty -m "gitfiti" > /dev/null
```

## 另外

amend 方法：用来修改上一次提交。

```bash
git log -2 # 查看最近两次提交log

# 修改提交的 message
GIT_AUTHOR_DATE=2015-07-10T12:00:00 GIT_COMMITTER_DATE=2015-07-10T12:00:00 git commit --amend --allow-empty -m "modify"

# 修改提交的时间
# GIT_COMMITTER_DATE='2016-07-12 00:00:00' GIT_AUTHOR_DATE='2016-07-12 00:00:00' git commit --amend --no-edit --date '2016-07-12 00:00:00'
GIT_COMMITTER_DATE='2015-07-12 00:00:00' GIT_AUTHOR_DATE='2015-07-12 00:00:00' git commit --amend --allow-empty --date '2015-07-12 00:00:00' -m "modify2"
```



使用git rebase可以修改多个提交：

```bash
# 提交的范围
git rebase -i/--interactive HEAD~<number of commits>
# 该 hash 之后的所有提交
git rebase -i/--interactive <commit hash>

git commit --all --amend --no-edit
git rebase --continue
```


删除之前的提交
```bash
# 删除上次提交
git reset --hard HEAD^

# 删除指定提交之后的全部提交（指定的这次提交保留）
git reset --hard 53c6a341d57120fefccbaca32829acb9dd766bb1
```
