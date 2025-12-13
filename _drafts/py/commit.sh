commitDate="2025-12-13T11:00:00"
cd a
GIT_AUTHOR_DATE="$commitDate" GIT_COMMITTER_DATE="$commitDate" git commit -m "update"
git push
cd ..
cd agent
GIT_AUTHOR_DATE="$commitDate" GIT_COMMITTER_DATE="$commitDate" git commit -m "update"
git push
cd ..
git add a
GIT_AUTHOR_DATE="$commitDate" GIT_COMMITTER_DATE="$commitDate" git commit -m "update"
git push