---
title: SOLID Principles
permalink: /en/solid/
article: false
externalLinkIcon: false
aside: false
readingTime: false
comment: false
editLink: false
contributors: false
changelog: false
copyright: false
createTime: 2025/03/27 16:17:51
---
## What is object-oriented programming?
Design patterns are for the programming paradigm of object-oriented programming. So before learning design patterns, we must also understand what ==object-oriented programming== is. ​​Object-oriented programming is to extract different objects from the problem, and each object has its own properties and behaviors. The process of solving problems is completed by the interaction between objects through "behavior".

## What is the difference between object-oriented and process-oriented?
Corresponding to **object-oriented programming ( OOP ) **, there is also **process-oriented programming ( POP ) **. These two programming paradigms represent two ideas of code organization. We will take the example of writing a small program for playing Gobang to see how two different ideas will organize the same function of playing chess.

### Process Oriented ( POP )
For the chess game, we divide it into several steps: displaying the chessboard, playing chess, and checking victory. The function of playing chess is achieved by continuously looping several functions.

Please refer to the pseudo code below:
::: code-tabs
@tab play_chess.py
``` python
# Initialize the board
def initCheckerboard ( )
# Display the board
def showCheckerboard ( board )
# Play chess
def play ( board, player, row, column )
# Check victory
def victoryConditionCheck ( board, player )

# Main function entry
if __name__ == "__main__":
    initCheckerboard ( )
    curPlayer = player1
    while not ( someoneWin or boardIsFull ) :
        showCheckerboard ( board )
        row, col = getUserInput ( curPlayer )
        play ( board, curPlayer, row, col )

        if victoryConditionCheck ( board, curPlayer ) :
            print ( ">>>Current player wins!" )
            break
        curPlayer = switchPlayer ( curPlayer )
```
:::

### Object-oriented ( OOP )
In the process of playing chess, we found that we can extract **Board** and **Player** are two objects. Displaying, judging victory, judging whether the board is full, moving chess pieces, etc. are board actions. Playing chess is a player action. So we can get the following pseudo code:
::: code-tabs
@tab play_chess.py
```python
# Board class
class CheckerBoard:
    def __init__ ( self ) :
    self.board = []
    def show ( self )
    def play ( self )
    def victoryConditionCheck ( self )
    def isFull ( self )

class Player:
    def __init__ ( self, playerName ) :
    self.name = playerName
    def input ( self )

# Main function entry
if __name__ == "__main__":
    board = CheckerBoard ( )
    player1 = Player ( "Bob" )
    player2 = Player ( "Jack" )

    curPlayer = player1

    while not ( board.victoryConditionCheck ( curPlayer ) or board.isFull ( )) :
        board.show ( )
        row, col = curPlayer.input ( )
        board.play ( curPlayer, row, col )

        if board.victoryConditionCheck ( curPlayer ) :
            print ( f">>>Current player {curPlayer.name} wins!" )
            break

    curPlayer = switchPlayer ( curPlayer )
```
:::

::: note Advantages of object-oriented programming
1.  More clarity. You can manage the state and behavior of an object separately. Procedural programming often confuses the two.
2.  Code reuse. Code reuse can be achieved through inheritance and polymorphism. For example, now in addition to human players, we can add AI players. We can directly inherit without adding too many functions.
3.  High scalability. If the function of retracting chess is added at this time, object-oriented programming can be modified by adding classes or methods in classes without modifying existing parts.
:::

## Summary
This column will introduce 5 class design principles that need to be followed in the process of object-oriented programming, so as to help programmers better manage their own code and truly play the advantages of object-oriented programming.

The seven principles are not isolated from each other, and there is a certain relationship between them. One may be a reinforcement or foundation of the other, and violating one may mean violating several other principles at the same time. Among them, ==Open-Closed Principle== is the cornerstone of object-oriented programming, and other principles can be regarded as means and tools to implement the Open-Closed Principle.

**Design Goals**
<CardGrid>
<LinkCard title="Open-Closed Principle" href="/en/solid/ocp/" />
<LinkCard title="Lickskov Substitution Principle" href="/en/solid/lsp/" />
</CardGrid>

**Design Methods**
<CardGrid>
<LinkCard title="Single Responsibility Principle" href="/en/solid/srp/" />
<LinkCard title="Interface Segregation Principle" href="/en/solid/isp/" />
<LinkCard title="Dependency Inversion Principle" href="/en/solid/dip/" />
</CardGrid>
