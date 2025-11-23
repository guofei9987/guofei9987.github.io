commitDate="2025-11-23T14:00:00"
cd a
GIT_AUTHOR_DATE="$commitDate" GIT_COMMITTER_DATE="$commitDate" git commit -m "update"
git push
cd ..
git add a
GIT_AUTHOR_DATE="$commitDate" GIT_COMMITTER_DATE="$commitDate" git commit -m "update"
git push