import { useState, useEffect } from "react";
import { move, isMoveAllowed } from "../utils";

const GameField = () => {
  // Logical representation of the game field
  // 0 - Empty
  // 1 - Falling Tile
  // 2 - Center of the Tile Falling (needed for turning)
  // 3 - Laying Tiles
  const [gameFieldState, setGameFieldState] = useState([
    [0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  // Visual representation of game field
  let gameField = "";
  for (let row = 0; row < 20; row++) {
    gameField += "<!";
    for (let col = 0; col < 10; col++) {
      gameField += gameFieldState[row][col] === 0 ? " ." : "[]";
    }
    gameField += "!>\n";
  }
  gameField +=
    "<!====================!>\n" + "  \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\n";

  // Set interval to move tile down every half second
  useEffect(() => {
    const interval = setInterval(() => {
      move("D", gameFieldState, setGameFieldState);
    }, 500);

    // Clean up
    return () => clearInterval(interval);
  }, []);

  // Game controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["7", "ArrowLeft"].includes(event.key)) {
        // move left
        move("L", gameFieldState, setGameFieldState);
      } else if (["9", "ArrowRight"].includes(event.key)) {
        // move right
        move("R", gameFieldState, setGameFieldState);
      } else if (["8", "ArrowUp"].includes(event.key)) {
        // turn
        turn();
      } else if (["4", "ArrowDown"].includes(event.key)) {
        // move faster
        move("D", gameFieldState, setGameFieldState);
        move("D", gameFieldState, setGameFieldState);
        move("D", gameFieldState, setGameFieldState);
      } else if (["5", " "].includes(event.key)) {
        // drop
        while (isMoveAllowed(gameFieldState)) {
          move("D", gameFieldState, setGameFieldState);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Turns the tile right
  const turn = () => {
    const currentTile = [];
    const tileCenter = [];
    let moveAllowed = true;

    // Add all coordinates of the tile moving to currentTile
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (gameFieldState[row][col] === 1) {
          currentTile.push([row, col]);
        } else if (displayState[row][col] === 2) {
          tileCenter.push(row);
          tileCenter.push(col);
        }
      }
    }

    // Turn only if center exists (p.s. square doesnt have defined center because it doesnt have to be turned)
    // Turn only if center's row !== 0 to prevent tile from going off the grid
    if (tileCenter[0] !== undefined && tileCenter[0] !== 0) {
      // Check if turn is allowed
      let tileSize = currentTile.length;
      for (let i = 0; i < tileSize; i++) {
        let rowDiff = tileCenter[0] - currentTile[i][0];
        let colDiff = tileCenter[1] - currentTile[i][1];
        // XOR only one of them is true
        // if current pixel is left, right, up or down 1 pixel from center
        /*
                []
              [][][]
                []
            */
        if ((Math.abs(rowDiff) === 1) ^ (Math.abs(colDiff) === 1)) {
          if (rowDiff === 0) {
            if (colDiff === 1) {
              if (
                ![0, 1].includes(
                  displayState[currentTile[i][0] - 1][currentTile[i][1] + 1]
                )
              ) {
                moveAllowed = false;
              }
            } else if (colDiff === -1) {
              if (
                ![0, 1].includes(
                  displayState[currentTile[i][0] + 1][currentTile[i][1] - 1]
                )
              ) {
                moveAllowed = false;
              }
            }
          } else if (colDiff === 0) {
            if (rowDiff === 1) {
              if (
                ![0, 1].includes(
                  displayState[currentTile[i][0] + 1][currentTile[i][1] + 1]
                )
              ) {
                moveAllowed = false;
              }
            } else if (rowDiff === -1) {
              if (
                ![0, 1].includes(
                  displayState[currentTile[i][0] - 1][currentTile[i][1] - 1]
                )
              ) {
                moveAllowed = false;
              }
            }
          }
        }
        // AND both of them is true
        // if current pixel is diagonally 1 pixel from center
        /*
              []  []
                []
              []  []
            */
        else if (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1) {
          if (rowDiff === 1 && colDiff === 1) {
            if (
              ![0, 1].includes(
                displayState[tileCenter[0] - 1][tileCenter[1] + 1]
              )
            ) {
              moveAllowed = false;
            }
          } else if (rowDiff === 1 && colDiff === -1) {
            if (
              ![0, 1].includes(
                displayState[tileCenter[0] + 1][tileCenter[1] + 1]
              )
            ) {
              moveAllowed = false;
            }
          } else if (rowDiff === -1 && colDiff === -1) {
            if (
              ![0, 1].includes(
                displayState[tileCenter[0] + 1][tileCenter[1] - 1]
              )
            ) {
              moveAllowed = false;
            }
          } else if (rowDiff === -1 && colDiff === 1) {
            if (
              ![0, 1].includes(
                displayState[tileCenter[0] - 1][tileCenter[1] - 1]
              )
            ) {
              moveAllowed = false;
            }
          }
        }
        // if this is a 2nd pixels from center
        /*
              []  []

              []
            */
        else if (Math.abs(rowDiff) === 2 || Math.abs(colDiff) === 2) {
          if (rowDiff === -2) {
            if (
              ![0, 1].includes(
                displayState[currentTile[i][0] - 2][currentTile[i][1] + 2]
              )
            ) {
              moveAllowed = false;
            }
          } else {
            if (
              ![0, 1].includes(
                displayState[currentTile[i][0] + 2][currentTile[i][1] - 2]
              )
            ) {
              moveAllowed = false;
            }
          }
        }
      }

      // turn the tile
      if (moveAllowed) {
        for (let i = 0; i < tileSize; i++) {
          displayState[currentTile[i][0]][currentTile[i][1]] = 0;
        }

        for (let i = 0; i < tileSize; i++) {
          let rowDiff = tileCenter[0] - currentTile[i][0];
          let colDiff = tileCenter[1] - currentTile[i][1];
          // XOR only one of them is true
          // if current pixel is left, right, up or down 1 pixel from center
          /*
                  []
                [][][]
                  []
                */
          if ((Math.abs(rowDiff) === 1) ^ (Math.abs(colDiff) === 1)) {
            if (rowDiff === 0) {
              if (colDiff === 1) {
                displayState[currentTile[i][0] - 1][currentTile[i][1] + 1] = 1;
              } else if (colDiff === -1) {
                displayState[currentTile[i][0] + 1][currentTile[i][1] - 1] = 1;
              }
            } else if (colDiff === 0) {
              if (rowDiff === 1) {
                displayState[currentTile[i][0] + 1][currentTile[i][1] + 1] = 1;
              } else if (rowDiff === -1) {
                displayState[currentTile[i][0] - 1][currentTile[i][1] - 1] = 1;
              }
            }
          }
          // AND both of them is true
          // if current pixel is diagonally 1 pixel from center
          /*
                []  []
                  []
                []  []
                */
          else if (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1) {
            if (rowDiff === 1 && colDiff === 1) {
              displayState[tileCenter[0] - 1][tileCenter[1] + 1] = 1;
            } else if (rowDiff === 1 && colDiff === -1) {
              displayState[tileCenter[0] + 1][tileCenter[1] + 1] = 1;
            } else if (rowDiff === -1 && colDiff === -1) {
              displayState[tileCenter[0] + 1][tileCenter[1] - 1] = 1;
            } else if (rowDiff === -1 && colDiff === 1) {
              displayState[tileCenter[0] - 1][tileCenter[1] - 1] = 1;
            }
          }
          // if this is a 2nd pixels from center
          /*
                []  []

                []
                */
          else if (Math.abs(rowDiff) === 2 || Math.abs(colDiff) === 2) {
            if (rowDiff === -2) {
              displayState[currentTile[i][0] - 2][currentTile[i][1] + 2] = 1;
            } else {
              displayState[currentTile[i][0] + 2][currentTile[i][1] - 2] = 1;
            }
          }
        }

        updateDisplay();
      }
    }
  };

  return <pre>{gameField}</pre>;
};

export default GameField;
