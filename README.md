# Judgement - Card Game
- Judgement is a fun 2 - 4 player card game that is played with a standard deck of 52 cards. 
- The game requires players to possess great predictive and analytical skills to succeed.

Website: www.playjudgement.web.app

<p>
  <img width="400" alt="Create Room" src="https://user-images.githubusercontent.com/35095726/91213603-79bb0400-e72f-11ea-8e2a-c484ba806482.png">
  <img width="400" alt="Join Room" src="https://user-images.githubusercontent.com/35095726/91213826-cbfc2500-e72f-11ea-8434-fc22fed19490.png">
</p>


## Rules
### Game
- A game of judgement has a total of 14 rounds in which each player is dealt an equal number of cards. 
- The number of cards dealt to each player depends on the round and uniformly decreases from 7 - 1 for the first 7 rounds and then uniformly increases from 1 - 7 for the last 7 rounds. 
- Each round also has a corresponsing **joker** which refers to one of the four suits. This **joker** changes each in the repeating pattern: :spades: :hearts: :clubs: :diamonds:. The table below illustrates the relationship between the round, number of cards dealt and the joker. 
- The players take turns dealing each round with the dealer responsibility moving to the next player after each round in clockwise direction.

| Round | Cards | Joker |
| ----------- | ----------- | ----------- |
| 1 | 7 | :spades: |
| 2 | 6 | :hearts: |
| 3 | 5 | :clubs: |
| 4 | 4 | :diamonds: |
| 5 | 3 | :spades: |
| 6 | 2 | :hearts: |
| 7 | 1 | :clubs: |
| 8 | 1 | :diamonds: |
| 9 | 2 | :spades: |
| 10 | 3 | :hearts: |
| 11 | 4 | :clubs: |
| 12 | 5 | :diamonds: |
| 13 | 6 | :spades: |
| 14 | 7 | :hearts: |

### Round
**Predicting:**
Before the start of each round the players make a prediction about the number of hands they will win based on the cards they have been dealt. The predicting starts with the player to the left of the dealer and continues around the table until it reaches the dealer. The dealer must then make a prediction such that the total number of hands predicted do not equal the number of cards dealt to each player for that round. All predictions are noted under the player's column. The table below shows the distinction between valid and invalid predictions. 

| # | Player A | Player B | Player C | Total | Cards Dealt | Valid |
| - | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| 1 | 1 hands | 2 hands | 4 hands | 7 hands | 4 cards | :heavy_check_mark: |
| 2 | 2 hands | 0 hands | 1 hands | 3 hands | 4 cards | :heavy_check_mark: |
| 3 | 1 hands | 1 hands | 5 hands | 7 hands | 4 cards | :x: | 
| 4 | 2 hands | 2 hands | 0 hands | 4 hands | 4 cards | :x: | 

- Prediction #3 is invalid because it is impossible for Player C to win more hands than the number of cards dealt that round
- Prediction #4 is invalid because the total number of hands predicted cannot equal to number of cards dealt that round

**Playing:**
Once all players have made predictions have been made, the round begins in which players play a series of hands. Once all hands are complete, the number of hands won by each player are tallied and compared against the number of hands predicted by each player. If the prediction turns out to be correct, the players recieves points, however if it is incorrect, the player recieves no points for that round.

### Hand
- The number of hands played in each round is equal to the number of cards dealt that round. 
- The player who predicts the most number of hands in the prediction phase of the round is given the opportunity of beginning the first hand. 
- The involves all players, in turns, moving clockwise from the player who started the round, must place a valid card of their choosing, from the cards they have been dealt, at the center of the table. 
- The suit of the first card that was played in the hand determines the primary suit of the hand. 
- What this means is that players following the starting player, must play a card of the same suit as what was played by the first player. 
- If they do not have any card of that suit, they are free to play any card they have. 
- The hand ends when everyone has played a card, and the hand is won by the player who plays the best card. 
- After the hand is completed, all played cards are discarded for the rest of the round. 
- Each subsequent hand is started by the winner of the previous hand.

### Heirarchy
The best card of the round is determined by a combination of suit heirarchy and value heirarchy
The suit heirarchy takes dominance when comparing cards however the value heirarchy is used to determine the better card when there are two cards of the same suit.
The tables below show the suit and value heirarchy where the suits / values higher in the table beats the suits / values lower in the table.

| Suit |  
| ----- |
| Joker Suit |
| Primary Suit |
| Remaining Suits* |

| Value |  
| ----- |
| A |
| K |
| Q | 
| J | 
| 10 |
| 9 |
| 8 | 
| 7 | 
| 6 |
| 5 |
| 4 | 
| 3 | 
| 2 |

*\*Since there must always be a primary suit in each hand (since the primary suit is the starting suit, a situation where all cards are from the remaining suits category cannot exist and therefore there is always a hand winning card)*

### Scoring
At the end of each round, players are scored based on how well they predicted. 
- If the predicted number of hands equals the number of hands won for a specific player, the player recieves **(10 + predicted number of hands) points** for that round. 
- If the predicted number of hands does not equal the number of hands won for a specific player, the player recieves **0 points** for that round.
- Once all rounds are complete, the game ends and the points won across all rounds are totaled for each player. The player with the most points wins the game.
