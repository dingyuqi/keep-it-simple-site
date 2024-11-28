---
title: Modify usernames in existing Git commits in batches
tags:
- Git
---
For a long time, commits on GitHub were all made using work accounts, which caused confusion among committers in private repositories. I found a bash script in StackOverflow that can modify usernames in batches. I change it a bit and record it here.

There are two steps to modify:
1. Execute the modification script
2. Synchronize local modifications to the Git server

## Run the script
::: code-tabs
@tab rewrite.sh
```bash
#!/bin/sh

git filter-branch -f --env-filter '
OLD_EMAIL="your-old@email.com"
CORRECT_NAME="correct-git-username"
CORRECT_EMAIL="your-new@email.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
export GIT_COMMITTER_NAME="$CORRECT_NAME"
export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```
:::

Create a `rewrite.sh` file, modify `OLD_EMAIL`, `CORRECT_NAME` and `CORRECT_EMAIL` in the script as needed, and put the modified script in the root directory of the project to be modified and execute it.
```bash
bash ./rewrite.sh
```

## Synchronize Git log Go to the server
Check the printed information. If the modification is successful, you can execute the command:
```bash
git log
```
This command can view the modification status of the existing commit information. If it is correct, execute `git push -f` to synchronize the modified content to the Git server.

<br /><br /><br />

::: info References for this article
1. [How to sync local history after massive git history rewrite?](https://stackoverflow.com/questions/48267025/how-to-sync-local-history-after-massive-git-history-rewrite)
:::