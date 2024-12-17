---
title: Jenkins 部署 Windows 服务完成自动打包
createTime: 2021/11/18 00:00:00
tags:
  - 部署
permalink: /article/t3wae9vi/
---
## 安装 Jenkins
### 确认安装环境
Jenkins 要求安装 Java8-11, 其余 Java 版本暂不支持.

::: important
java SDK 安装后记得配置环境变量.
::: details 环境变量配置
系统变量创建 `JAVA_HOME`, 选择 `C:\Programe Files\jdk-11.0.9`

`Path` 变量添加 `%JAVA_HOME%\bin` (如果不成功可以这个地方尝试使用绝对路径)

如果原先已经安装过 jdk, 要先卸载, 然后把之前配置的环境变量删除干净.
:::

运行以下命令来确认 Java 配置成功

```shell
java -version
```

### 安装 Jenkins
Jenkins 下载地址: <https://jenkins.io/download/> , 下载 war 包, 命令行安装. 

下载完成后, 进入命令行模式, 直接定位到 jenkins.war 所在的目录, 然后执行下面的命令: 

```shell
java -jar jenkins.war
```

安装完成后打开浏览器, 输入: `http://localhost:8080`. 等待之后出现:

![install-jenkins-1](/illustration/install-jenkins-1.png)

根据提示将标红地址中的密码复制粘贴到下面. 先不安装插件, 之后统一安装.

![install-jenkins-2](/illustration/install-jenkins-2.png)

![install-jenkins-3](/illustration/install-jenkins-3.png)

之后创建一个管理员用户, 点击"保存并完成", Jenkins 就安装成功了.


### 安装 Jenkins 的插件
Jenkins 安装成功后, 可已经将它设置成 ***Windows服务***, 不用每次通过命令提示符输入命令启动了. 设置成服务的方法如下: 

![install-jenkins-plugin-1](/illustration/install-jenkins-plugin-1.png)

按照提示就可以配置成功了, 在 Windows 服务列表中就可以找到 Jenkins 了.

![install-jenkins-plugin-2](/illustration/install-jenkins-plugin-2.png)

这时我们要配置 Jenkins 的用户, 以便之后在 Jenkins 上构建项目时运行的命令无法获取本地的环境变量配置. 右键 Jenkins 服务, 选择属性, 选择"登录"配置.

![install-jenkins-plugin-3](/illustration/install-jenkins-plugin-3.png)

![install-jenkins-plugin-4](/illustration/install-jenkins-plugin-4.png)

![install-jenkins-plugin-5](/illustration/install-jenkins-plugin-5.png)

之后点击确定, 在此账户中显示正确的用户之后填写正确的用户密码即可之后点击确定. 

### 插件下载提速
默认插件下载是从 Jenkins 官网的地址下载, 太慢了. 将地址替换为以下地址: 

```text
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
```

![install-jenkins-plugin-6](/illustration/install-jenkins-plugin-6.png)

如图, 将URL替换为清华的源

![install-jenkins-plugin-7](/illustration/install-jenkins-plugin-7.png)

打开 Jenkins 所在目录, 即安装的 `.war` 时的目录, 进入 `.jenkins/update` 文件夹, 找到 `default.json` 文件.

```
替换 updates.jenkins-ci.org/download 为 mirrors.tuna.tsinghua.edu.cn/jenkins
替换 updates.jenkins.io/download 为 mirrors.tuna.tsinghua.edu.cn/jenkins
替换 www.google.com 为 www.baidu.com
```

然后找到 `Jenkins/hudson.model.UpdateCenter.xml` 文件.

```
替换 url 为 https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
```

如果还不行, 就离线下载 [Jenkins 插件](http://updates.jenkins-ci.org/download/plugins/), 然后采用上传的方式.  

### Jenkins 汉化
进入 **系统管理->插件管理**, 安装插件: Localization:Chinese, 之后重启 Jenkins 服务, 能够部分汉化.

### Git 和 Gitlab 插件安装
进入 **系统管理->插件管理**, 安装 Git 和 Gitlab 插件. Git 插件有几个依赖, 如果安装不上就离线安装. 

```
scm-api (1.0),
workflow-scm-step (1.14.2)
Git-client (1.19.6) 
workflow-setp-api.hpi(1.14.2)(貌似与workflow-scm-step保持一致)
```

### 配置 Gitlab
进入**管理->系统管理-> Gitlab**

![jenkins-config-gitlab](/illustration/jenkins-config-gitlab.png)

Credentials 为在 Gitlab 上面生成的 API token, 具体生成方法见: [GitLab获取tokenAPI凭据 - 简书 (jianshu.com)](https://www.jianshu.com/p/d204c339eeef)

TestConnection 测试连接成功后保存退出.

## Jenkins 创建项目
::: steps
1. 创建项目
  
    ![jenkins-create-item-1](/illustration/jenkins-create-item-1.png)

2. 配置项目名称和项目类型

    ![jenkins-create-item-2](/illustration/jenkins-create-item-2.png)

3. 选择 Gitlab 的连接
    ![jenkins-create-item-3](/illustration/jenkins-create-item-3.png)

4. 在源码管理中选择 Git, 配置本次打包从哪个分支上拉取代码进行打包

    ![jenkins-create-item-4](/illustration/jenkins-create-item-4.png)

5. 配置 Gitlab 的 token, 完成拉取的认证

    ![jenkins-create-item-5](/illustration/jenkins-create-item-5.png)

6. 配置构建的触发器(如果需要的话)

    ![jenkins-create-item-6](/illustration/jenkins-create-item-6.png)

7. 进行任务构建

    ![jenkins-create-item-7](/illustration/jenkins-create-item-7.png)

    ![jenkins-create-item-8](/illustration/jenkins-create-item-8.png)

    ![jenkins-create-item-9](/illustration/jenkins-create-item-9.png)

8. 配置 Shell executable

    如果"增加构建步骤"中需要执行 Git 命令, 则需要配置 Shell executable. 

    进入**系统配置**, 找到**Shell**,  将 Shell executable 配置为 `C:\Program Files\Git\bin\sh.exe`.
    
    ![jenkins-create-item-10](/illustration/jenkins-create-item-10.png)
:::

::: important Jenkins 的 Git Bash 中需要注意
1. 不能使用 `conda activate xxx` 来激活本地的虚拟环境, 会直接导致命令行运行结束. 需要替换为: `call activate xxx`
2. Git Bash 中的地址与 Windows 的地址有所不同. Windows 中 `D:/Software` 在 Git Bash 中为 `/d/Software`.
:::

## 配置 Git 的 SSH 密钥
为了保证本地对于 Gitlab 上面代码的拉取, 我们需要配置 SSH 密钥来保证可以通过 SSH 连接拉取和上传代码(使用 HTTP 连接会每次 pull 和 push 时输入用户名和密码, 不方便命令行操作)

我们先打开Git命令窗口.

首先, 确认自己是否已经拥有密钥

``` bash
cd ~/.ssh
ls
```

如果显示有 `id_rsa` 命名的文件, 其中一个带有 `.pub` 扩展名, 则说明已经拥有密钥. **你所要确保的是在 `C:/User/xxxx/.ssh` 这个文件夹底下和Git自己创建的 `/z/.ssh` 底下都分别有同样的一组 `id_rsa` 文件(否则只能pull不能push)**

如果之前没有密钥, 则输入以下命令, 建立新的SSH公钥和密钥. 
```bash
ssh-keygen
```
如果不希望更改密钥生成的位置, 则在提示 `Enter file in which to save the key ` 时直接回车, 之后按照提示输入两次 Git 密码则可以在 `/z/.ssh` 底下看到新生成的密钥. 

输入命令来获取公钥: 

``` bash
cd /z/.ssh
cat id_rsa.pub
```

到 **Gitlab->Setting->SSH加密** 中创建新密钥, 将公钥的全部内容(包括第一行的 SSH)复制到其中, 点击确定即可. 

## 开始打包
::: steps
1. 进入项目

    ![jenkins-build-item-1](/illustration/jenkins-build-item-1.png)

2. 触发打包

    ![jenkins-build-item-2](/illustration/jenkins-build-item-2.png)

3. 查看打包任务

    可以在打包任务进行中或者结束后查看控制台的输出, 以保证任务的正常进行.

    ![jenkins-build-item-3](/illustration/jenkins-build-item-3.png)
    ![jenkins-build-item-4](/illustration/jenkins-build-item-4.png)

4. 更改打包任务

    如果打包过程中有任何的问题, 可以进入任务配置中更改.

    ![jenkins-build-item-5](/illustration/jenkins-build-item-5.png)
:::

::: details Jenkins 打包配置命令行

::: code-tabs
@tab windows
```shell
cd C:\Users\dingyq\.jenkins\workspace\ige_increment_qt
call activate ige_increment
rd /s/q dist
rd /s/q build
pyinstaller main.spec
echo d | xcopy C:\Users\dingyq\Anaconda3\envs\ige_increment\Lib\site-packages\jieba\* C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main\jieba /s /f /h /y
cd extractor
mkdir ops
echo f | xcopy D:\dyqProjects\ige_increment\extractor\ops\feature_eng.py C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main\extractor\ops\ /s /f /h /y
cd C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main
mkdir Qt
echo d | xcopy D:\dyqProjects\ige_increment\Qt\dist C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main\Qt\dist /s /f /h /y
echo f | xcopy D:\dyqProjects\ige_increment\Qt\dist\favicon.ico C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main\Qt /s /f /h /y
echo f | xcopy C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main\Pyside2\bin\QtWebEngineProcess.exe C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main /s /f /h /y
xcopy C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main\Pyside2\resources\* C:\Users\dingyq\.jenkins\workspace\ige_increment_qt\dist\main /s /f /h /y
```

@tab git
``` shell
cd  /c/Users/dingyq/.jenkins/workspace/ige_increment_qt/dist/main
git config --local user.name "dingyuqi"
git config --local user.email "dingyuqi@sics.ac.cn"
git config --global sendpack.sideband false
git config --local sendpack.sideband false
git init
git remote add origin git@192.168.200.50:dingyuqi/ige_qt.git
git add .
git commit -m "change"
git push -f origin master
```

@tab main.spec
``` shell
// Qt打包需要更改的 main.spec
from PyInstaller.utils.hooks import collect_data_files, copy_metadata
block_cipher = None
datas = copy_metadata('tqdm')
datas += copy_metadata('regex')
datas += copy_metadata('sacremoses')
datas += copy_metadata('requests')
datas += copy_metadata('packaging')
datas += copy_metadata('filelock')
datas += copy_metadata('numpy')
datas += copy_metadata('tokenizers')
datas += copy_metadata('importlib_metadata')
datas += copy_metadata('dataclasses')
```
:::