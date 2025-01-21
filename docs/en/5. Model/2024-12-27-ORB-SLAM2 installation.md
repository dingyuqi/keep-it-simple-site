---
title: ORB-SLAM2 Installation Guide
tags:
  - Installation Guide
createTime: 2024/12/27 09:48:12
permalink: /en/article/orb-slam2-installation-guide/
---
## Preface
This blog will describe in detail how I installed Ubuntu16.04 dual system in bare metal state and installed the corresponding version of ROSkinetic system. In addition, after installing these two systems, how to successfully install and debug INDEMIND binocular camera and implement ORB-SLAM2 algorithm.
<!-- more -->

::: info This article is my work notes of laboratory work during undergraduate period, officially recorded in January 2020, and now recorded on this blog site.
:::

::: info Hardware preparation
I use DELL-inspirion 5488, which is equipped with 3.0 USB interface for the camera.

Please do not lower than this configuration during the installation process, so as to avoid the algorithm cannot be executed after installation.
:::

The whole installation process includes the following major links. If you have already installed some modules, you can skip this part.
::: steps
1. [Install Ubuntu16.04](/en/article/orb-slam2-installation-guide/#install-ubuntu16-04)

2. [Install ROS](/en/article/orb-slam2-installation-guide/#install-ros)

3. [Install ORB-SLAM algorithm in INDEMIND](/en/article/orb-slam2-installation-guide/#install-the-orb-slam-algorithm-in-indemind)
:::

## Install Ubuntu16.04
IDEMIND binocular camera can match Ubuntu18.04 and Ubuntu16.04 versions of Ubuntu, but it is best to use Ubuntu16.04 version.

Because I installed it too many times, I forgot to take screenshots. For detailed process, please refer to this article: [Install Ubuntu 16.04 desktop](https://ubuntu.com/tutorials/install-ubuntu-desktop-1604#1-overview)

## Install ROS
::: info References
1. [Install ROS kinetic on Ubuntu16.04](https://blog.csdn.net/softimite_zifeng/article/details/78632211)
2. [ROS kinetic official website](http://wiki.ros.org/kinetic/Installation/Ubuntu)
3. [Install ROS on Ubuntu18.04.1](https://blog.csdn.net/sinat_34130812/article/details/81666728)
:::

::: important About the version
During the installation process, please pay attention to the ROS version, which must match your Ubuntu version.
Ubuntu16.04 corresponds to The ROS version is kinetic. If you don't know which version of ROS your Ubuntu corresponds to, you can search Baidu.

Friends with the ability can go directly to the [ROS kinetic official website](http://wiki.ros.org/kinetic/Installation/Ubuntu) and follow the official installation guide. Most of the installation processes on the Internet are translated from the official website. And the official website can guarantee that the latest key is used.
:::

::: important Be sure to use a stable network during the installation process! Most of the errors are caused by unstable network.
:::

::: steps
1. Configure Ubuntu's resource library. (Optional)

    ![Ubuntu resource library configuration](/illustration/ubuntu-resource-conf.png)
    ::: tip
    If you are in China, the URL of `Download from` is most effective when using Alibaba Cloud's link.
    ``` text
    http://mirrors.aliyun.com/ubuntu
    ```
    :::

2. Set Ubuntu's `sources.list`.

    ```bash
    sudo sh -c 'echo "deb http://packages.ros.org/ros/Ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
    ```

3. Set key.
    ```bash
    sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
    ```
    ::: tip
    If you cannot connect to the above server, you can try to replace keyserver with `hkp://pgp.mit.edu:80` or `hkp://keyserver.Ubuntu.com:80`.
    :::

4. Update package.
    ```bash
    sudo apt-get update
    ```

5. Install ROS kinetic Full version.
    ```bash
    sudo apt-get install ros-kinetic-desktop-full
    ```
    ::: tip
    After installation, you can view the available packages through the following command:
    ```bash
    apt-cache search ros-kinetic
    ```
    :::

6. Initialize rosdep.

    Before using ROS, you must initialize it, use the following command:
    ```bash
    sudo rosdep init
    rosdep update
    ```

7. Configure the environment.

    ```bash
    echo "source /opt/ros/kinetic/setup.bash" >> ~/.bashrc
    source ~/.bashrc
    ```
    ::: important Among them: `sourc ~/.bashrc` is the code to update the configuration file. This command must be executed every time the bash file is changed to take effect.
    :::

8. Install the dependencies of the building package.

    ```bash
    sudo apt-get install python-rosinstall python-rosinstall-generator python-wstool build-essential
    ```

9. Test that ROS is installed successfully.

    1. Open Termial and enter the following command to initialize the ROS environment:
    ```bash
    roscore
    ```

    2. Open a new Termial and enter the following command to pop up a small turtle window:

    ```bash
    rosrun turtlesim turtlesim_node
    ```

    3. Open a new Termial and enter the following command to control the movement of the turtle with the arrow keys in Termial:

    ```bash
    rosrun turtlesim turtle_teleop_key
    ```
    ![turtlesim runs successfully](/illustration/turtlesim-success.png)

    4. Open a new Termial and enter the following command to pop up a new window to view the ROS node information:

    ```bash
    rosrun rqt_graph rqt_graph
    ```
    ![ROS node information](/illustration/rqt-graph-success.png)
:::

## Install The ORB-SLAM Algorithm In INDEMIND
::: note The following process is mostly a record of the installation operation process under the Ubuntu18.04 version. The second installation of the Ubuntu16.04 version is slightly different. The differences are reflected in the form of annotations, and there is no screenshot record.
:::

The algorithm for installing this camera is divided into the following main steps:
1. [Configure the environment](/article/2iezf70h/#Configure the environment)
2. [Install the SDK dependent environment](/article/2iezf70h/#Install the SDK dependent environment)
3. [Install the SDK](/article/2iezf70h/#Install the SDK)

### Configure The Environment
#### Install Pangolin
::: info References
1. [ORB_SLAM2 of Pangolin Installation and Problem Solving](https://www.cnblogs.com/liufuqiang/p/5618335.html)
:::

::: important Before installing Pangolin, make sure the following environments have been installed correctly.

1. Glew
```bash
sudo apt-get install libglew-dev
```

1. CMake
```bash
sudo apt-get install cmake
```

1. Boost
```bash
sudo apt-get install libboost-dev libboost-thread-dev libboost-filesystem-dev
```

1. Python

Ubuntu16.04 and 18.04 come with Python2, no need to reinstall.
:::

After ensuring that the above prerequisites are installed, execute the following command to install Pangolin.

``` bash
git clone https://github.com/stevenlovegrove/pangolin.git
cd pangolin
mkdir build
cd build
cmake -DCPP11_NO_BOOST=1 ..
make -j
```
::: note Problems that may be encountered during installation
1. Network problems.
Be sure to pay attention to network problems during installation! If possible, try to use hotspots.

If the error reported in the middle is not an error like 'XXX package not found', it is mostly caused by unstable network. Re-execute the failed command multiple times to succeed.
2. `Package Not Found` problem.

Just follow the prompts to install the corresponding package. Note that after the installation package is completed, re-execute the following two lines of code to take effect:
```bash
cmake -DCPP11_NO_BOOST=1 ..
make -j
```
:::

::: details Problems I encountered.

1. ERROR 1: libpng12-dev installation failed.
    When executing `sudo apt-get install libjpeg-dev libpng12-dev libtiff5-dev libopenexr-dev`:
    ```bash
    E: Package 'libpng12-dev' has no installation candidate
    ```

    ***Solution***

    This error is because libpng12-dev has been discarded after Ubuntu16.04 and needs to be replaced with libpng-dev.
    ```bash
    sudo apt-get install libjpeg-dev libpng-dev libtiff5-dev libopenexr-dev
    ```
2. ERROR 2: xkbcommon not found.

    ![xkbcommon not found](/illustration/xkbcommon-not-found.png)

    ***Solution***

    ```bash
    sudo apt-get install libxkbcommon-dev
    ```
:::
#### Install OpenCV3.4.3
::: info References
1. [OpenCV3 Environment Configuration (Ubuntu18.04, OpenCV3.4.3)](https://blog.csdn.net/qq_32408773/article/details/83346816)
:::

::: important About the installed version
Opencv must be installed with version 3.4.3, otherwise INDEMIND will not run.
Although this article is an installation tutorial for 18.04, it is also completely fine for 16.04.
:::

::: steps
1. Install cmake and other dependencies.
    ```bash
    sudo apt-get update
    sudo apt-get install cmake
    sudo apt-get install build-essential libgtk2.0-dev libavcodec-dev libavformat-dev libjpeg.dev libtiff4.dev libswscale-dev libjasper-dev
    ```

2. Download the corresponding version from the opencv official website: <https://opencv.org/releases/>.

3. After downloading, unzip the file.

4. Enter the unzipped folder and create a `build` folder, and enter `build`.

    ```bash
    mkdir build
    cd build
    ```

5. cmake.

    ```bash
    cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local ..
    ```

6. Compile.

    ```bash
    sudo make
    ```
7. Execute the installation command.

    ```bash
    sudo make install
    ```

8. Configure the environment.

    ```bash
    sudo gedit /etc/ld.so.conf.d/opencv.conf
    ```
    Add to the blank document that opens:

    ```bash
    /usr/local/lib
    ```
    Then execute to make the changes take effect:

    ```bash
    sudo ldconfig
    ```

9. Configure bash.

    ```bash
    sudo gedit /etc/bash.bashrc
    ```
    Add to the end of the open file:

    ```bash
    PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig
    export PKG_CONFIG_PATH
    ```
    Then execute the following command to update:

    ```bash
    source /etc/bash.bashrc
    sudo updatedb
    ```
    Configuration completed!

10. Test.

    Enter `opencv-3.4.3/samples/cpp/example_cmake`, which contains some official cmake programs, and execute the camera program:

    ```bash
    cmake .
    make
    ./opencv_example
    ```

    **If you can call your computer's camera, it means the installation is successful!**
:::

#### Install Eigen3

```bash
sudo apt-get install libeigen3-dev
```

#### Install DBoW2
::: important When installing DBoW2, you need OpenCV support.
:::

```bash
git clone https://github.com/dorian3d/DBoW2

cd DBow2
mkdir build
cd build

cmake ..
make
sudo make install
```

#### Install g2o.
::: info References
1. [Ubuntu18.4 install g2o](https://blog.csdn.net/Coderii/article/details/87606036)
:::

::: steps
1. Download the compressed package from the [official website](https://github.com/RainerKuemmerle/g2o).

2. Install dependencies.
    ```bash
    sudo apt-get install cmake libeigen3-dev libsuitesparse-dev qtdeclarative5-dev qt5-qmake libqglviewer-dev
    ```

    It may happen that `linqglviewer-dev` cannot be installed. If you do not need the viewer module of g2o, you do not need to install this dependency. If you need it, you can download it directly from the official website, and then execute the following command to install it separately:

    ``` bash
    mkdir build
    cd build
    cmake …
    make
    sudo make install
    ```

3. Compile.
    ```bash
    mkidr build
    cd build
    cmake ..
    make
    ```
4. Install.

    ```bash
    sudo make install
    ```
:::

### Install SDK dependencies
::: steps
1. Install google-glog and gflags.

    ```bash
    sudo apt-get install libgoogle-glog-dev
    ```

2. Install BLAS&LAPACK.

    ```bash
    sudo apt-get install libatlas-base-dev
    ```

3. Install SuiteSparse and CXSparse.

    ```bash
    sudo apt-get install libsuitesparse-dev
    ```
:::

### Install SDK
::: important
Ubuntu16.04 must be compiled with GCC5.4, otherwise the link may fail.
:::

::: info References
1. [ROS SDK installation](https://indemind-sdk.readthedocs.io/zh_CN/latest/src/sdk/ros%20SDK%20anzhuang.html).
2. ORB-SLAM tutorial on INDEMIND WeChat official account.
:::

#### 1. Download SDK and source code
SDK: [https://github.com/INDEMIND/SDK-Linux](https://github.com/INDEMIND/SDK-Linux)

ORB-SLAM: [https://github.com/INDEMINDtech/run.ORB](https://github.com/INDEMINDtech/run.ORB)

#### 2. Install SDK
::: steps
1. After downloading SDK, go to `SDK-Linux/demo_ros/src` directory. Put the downloaded ORB-SLAM2 in this directory.
2. Replace `CMakeList.txt` to the `...SDK/demo_ros/src` directory.
3. Enter the `sdk/demo_ros/src/ORB_SLAM2/Vocabulary` directory and execute:

    ```bash
    tar -xf ORBvoc.txt.tar.gz
    ```
4. Open the terminal in the `demo_ros` folder of the Linux SDK and use the command to compile:

    ```bash
    catkin_make
    ```

    After successful execution, two executable files will be generated under the `demo_ros` folder:

    1. module_driver
    2. stereo_euroc

5. Open a new terminal and execute:

    ```bash
    roscore
    ```
6. Copy `module_driver` to `SDK/lib/1604`, open the terminal and execute:

    ```bash
    sudo -s
    sudo chmod 777 ./run.sh
    ./run.sh
    ```

7. Enter the `SDK/demo_ros` directory, open the terminal, and execute:

    ```bash
    ./stereo_euroc
    ```
:::

## Summary
:tada: :tada: When you complete all the above steps, you should be able to get a real-time ORM-SLAM algorithm :tada: :tada:
