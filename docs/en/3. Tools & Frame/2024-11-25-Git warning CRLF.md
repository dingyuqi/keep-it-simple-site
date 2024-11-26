---
title: "Git Tips on CRLF--Warning: in the working copy of CRLF will be replaced by LF the next time Git touches it."
tags:
  - Git
createTime: 2024/11/25 16:25:44
permalink: /en/article/ptn2a6ig/
---
I have been updating my blog recently and encountered three very troubling problems:
1. After executing the `git add` command, there is always a Warning prompt: `Warning: in the working copy of CRLF will be replaced by LF the next time Git touches it.`
2. `git clone` a new `repo` will directly display the file `modified`, even though nothing has been changed.
3. After submitting the local pdf file to the warehouse, it was inexplicably damaged, and large black spots appeared on the pdf file.

Later, I found that these 3 problems were actually caused by one problem: the `CRLF` symbol. Many people who searched online also encountered the same problem, Everyone said that we need to change the configuration of Git, but no one has explained the principle clearly. I will write a document to record it today.
<!-- more -->

## Cause of the problem
This is a problem caused by the inconsistent line breaks used by the two operating systems Windows and Linux.

- `CR`: `\r`
- `LF`: `\n`

Dos and Windows systems use carriage return (CR) plus line feed (LF), that is, pressing the Enter key inserts the two characters `CR` and `LF`. Mac and Linux systems only use the `LF` symbol. This leads to the conversion of these two symbols during cross-platform development.

Git is aligned with Linux by default, and I use Windows development, which leads to a series of problems.

## Solution
Obviously, the key to solving the problem lies in ==unifying the use of the two characters CR and LF==. After we unify the use of line breaks, if the PDF file is still damaged, it is because Git treats the PDF file as a general file and processes the line breaks. We just need to specify the pdf file as a binary file.

The solution steps are mainly divided into three parts, but not all of the three parts need to be operated. You need to decide according to your own situation.
- [Configure Git line break conversion strategy](/article/h19kugad/#Configure-git-line break conversion strategy)
- [Change existing line breaks](/article/h19kugad/#Change existing line breaks)
- [Specify pdf files as binary files](/article/h19kugad/#Specify-pdf-files as binary files)

### Configure Git line break conversion strategy
There is a `core.autocrlf` configuration in Git configuration, which has three values: `true`, `false` and `input`.

::: note `core.autocrlf` configuration
1. `core.autocrlf = true`
Automatically convert `CR + LF` to `LF` during `git add`. In `git checkout` LF is automatically converted to CR + LF when developing.

Suitable for development on Windows systems.

Configuration command:
``` shell
git config --local core.autocrlf true
```
2. `core.autocrlf = false`
No conversion between `CR + LF` and `LF` is performed under any circumstances.

Suitable for development on Linux systems.

Configuration command:
``` shell
git config --local core.autocrlf false
```
3. `core.autocrlf = input`
Convert `CR + LF` to `LF` only when `git add` is performed.

Suitable for development on Linux systems. If `CR + LF` is accidentally added during development, this configuration allows Git to automatically detect and convert it.

Configuration command:
``` shell
git config --local core.autocrlf input
```
:::

I recommend using this command whether in Windows or Linux. Development on Linux uses `LF`, after all, Git itself uses the `LF` character.

### Change existing line breaks
If you have written a lot of code and documents, what should you do if you want to unify all the line breaks?

Usually, our editor supports search and batch changes.

I use VSCode :[devicon:vscode]:.

1. Open the search function: `Ctrl + Shift + F`.

2. Set the search criteria: Open the ".*" button next to the search box for regular search, and enter `\r\n`.

3. Click `Replace All` to convert them all to `\n`.

We can also set the default line break to `LF` in our own IDEA to ensure that the line breaks of newly created files are correct.

Let's take VSCode :[devicon:vscode]: as an example:

1. Open `Preferences`.

2. Open `Settings`.

3. Enter `EOL`(End Of Line) in the search box.

4. Set it to `LF`.

### Specify pdf files as binary files
Generally speaking, Git can exclude CRLF symbol conversion for pdf files. However, it is not ruled out that pdf files will also be converted, which will cause damage to pdf files.

We can avoid this problem by forcing it to be specified.
1. Find the `.gitattributes` file in the root directory of the project. If there is no file, create a new one.
2. Add a line of content and save it.
``` md
*.pdf binary
```

We can use the `.gitattributes` file to force all files with the `.pdf` suffix to be treated as binary files. In fact, this applies to many file formats:

``` md
*.png binary
*.jpg binary
*.jpeg binary
*.ico binary
*.tff binary
*.woff binary
*.woff2 binary
*.pdf binary
```

## Summary
Git uses `LF` as the line break character by default, and I use Windows system by default `CRLF`. The inconsistency of line endings in different systems leads to Warning and a series of incorrect and damaged file modification status.

We can solve this problem in the following ways:
- Set Git `core.autocrlf`.
- Set the EOL of local IDEA.
- Globally replace CRLF symbols.
- Force the specified pdf file to be treated as a binary file in Git.