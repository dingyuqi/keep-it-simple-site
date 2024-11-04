---
title: 面向对象设计的七大设计原则
createTime: 2024/09/20 15:23:51
permalink: /designModel/
---
## 什么是面向对象编程?
设计模式是针对面向对象编程这种编程范式的. 那么在学习设计模式之前我们也要理解什么是 ==面向对象编程==. 面向对象编程是在问题中提取出不同的对象, 而每个对象都有自己的属性和行为. 我们解决问题的过程就是对象与对象之间通过"行为"交互来完成的.

## 面向对象与面向过程的区别?
与**面向对象编程(OOP)**相对应的, 还有**面向过程编程(POP)**. 这两种编程范式分别代表了两种代码组织的思想. 我们将以写一个下五子棋的小程序为例, 来看一下两种不同的思想会如何来组织下棋这个相同的功能.

### 面向过程(POP)
对于下棋这件事情, 我们分为显示棋盘, 下棋和检查胜利几个步骤. 通过不断循环几个函数来达成下棋的功能. 

可以参考下面的伪代码:
::: code-tabs
@tab play_chess.py
``` python
# 初始化棋盘
def initCheckerboard()
# 显示棋盘
def showCheckerboard(board)
# 下棋
def play(board, player, row, column)
# 检查胜利
def victoryConditionCheck(board, player)

# 主函数入口
if __name__ == "__main__":
    initCheckerboard()
    curPlayer = player1
    while not (someoneWin or boardIsFull):
        showCheckerboard(board)
        row, col = getUserInput(curPlayer)
        play(board, curPlayer, row, col)

        if victoryConditionCheck(board, curPlayer):
            print(">>>当前玩家胜利!")
            break
        curPlayer = switchPlayer(curPlayer)
```
:::

### 面向对象(OOP)
在下棋这个过程中, 我们发现可以提取 **棋盘** 和 **棋手** 两个对象. 而显示, 判断是否胜利, 判断棋盘是否已满, 移动棋子等属于棋盘的动作. 下棋是属于棋手的动作. 于是乎可以得到下面的伪代码:
::: code-tabs
@tab play_chess.py
```python
# 棋盘类
class CheckerBoard:
    def __init__(self):
        self.board = []
    def show(self)
    def play(self)
    def victoryConditionCheck(self)
    def isFull(self)

class Player:
    def __init__(self, playerName):
        self.name = playerName
    def input(self)

# 主函数入口
if __name__ == "__main__":
    board = CheckerBoard()
    player1 = Player("Bob")
    player2 = Player("Jack")

    curPlayer = player1

    while not (board.victoryConditionCheck(curPlayer) or board.isFull()):
        board.show()
        row, col = curPlayer.input()
        board.play(curPlayer, row, col)

        if board.victoryConditionCheck(curPlayer):
            print(f">>>当前玩家{curPlayer.name}胜利!")
            break
        
        curPlayer = switchPlayer(curPlayer)
```
:::

::: note 面向对象的优势
1. 更加清晰: 可以在对象中分别管理其状态和行为. 面向过程编程通常会混淆这两者.
2. 代码重用: 可以通过继承和多态来实现代码的复用. 比如现在除了人类玩家, 另外增加AI玩家, 我们可以直接进行继承而无需添加太多函数.
3. 高扩展性: 如果这个时候增加悔棋的功能, 面向对象编程可以通过增加类或者类中的方法来修改, 而无需修改已有的部分.
:::

## 总结
本栏目将介绍在面向对象编程的过程中需要遵守的类的 7 种设计原则, 以帮助程序员能够更好地管理自己的代码, 能真正意义上发挥面向对象编程的优势.

七个原则之间并不是相互孤立的, 彼此之间存在一定的关联. 一个可能是另一个的加强或者是基础, 违反其中一个可能意味着同时违反其他几种原则. 其中 ==开闭原则== 是面向对象编程的基石, 其他原则可以看作是实现开闭原则的手段和工具.

**设计目标**
<CardGrid>
  <LinkCard title="开闭原则" href="/designModel/4fb4t8ws/" />
  <LinkCard title="里氏替换原则" href="/designModel/0tdqgfh1/" />
  <LinkCard title="迪米特原则" href="/designModel/r18tx5ar/" />
</CardGrid>

**设计方法**
<CardGrid>
  <LinkCard title="单一职责原则" href="/designModel/agkqzc4e/" />
  <LinkCard title="接口隔离原则" href="/designModel/m4watttg/" />
  <LinkCard title="依赖倒置原则" href="/designModel/hp4bylot/" />
  <LinkCard title="组合复用原则" href="/article/vuqkixk6/" />
</CardGrid>

