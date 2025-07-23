// Update a cell in gameFieldState
export const updateCell = (
  row,
  col,
  val,
  gameFieldState,
  setGameFieldState
) => {
  const updatedField = [...gameFieldState];
  updatedField[row][col] = val;
  setGameFieldState(updatedField);
};

// List of tiles available
export const tiles = [
  [
    [1, 2, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ],

  [
    [1, 2, 1, 0],
    [0, 1, 0, 0],
  ],
  [
    [1, 2, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [1, 2, 1, 0],
    [1, 0, 0, 0],
  ],
  [
    [1, 2, 0, 0],
    [0, 1, 1, 0],
  ],
  [
    [0, 2, 1, 0],
    [1, 1, 0, 0],
  ],
];

// Places a selected tile at the top of the gamefield
export const placeTile = (
  tileIndex,
  gameFieldState,
  setGameFieldState,
  setGameState
) => {
  // Find the right tile
  const tile = tiles[tileIndex];

  let regularPodiumOcupated = false;
  let gameOver = false;

  // Check if you can place a tile
  for (let row = 1; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      if (gameFieldState[row][col] !== 0) {
        regularPodiumOcupated = true;
      }
    }
  }

  // If u cant place a tile check if u can place it one pixel above
  if (regularPodiumOcupated === true) {
    for (let row = 0; row < 2; row++) {
      for (let col = 3; col < 7; col++) {
        if (gameFieldState[row][col] !== 0) {
          gameOver = true;
        }
      }
    }
  }

  // If u still cant place a tile the game is over
  if (gameOver === true) {
    setGameState("gameover");
  }

  // Place a tile
  if (gameOver === false) {
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        updateCell(
          regularPodiumOcupated ? row : row + 1,
          col + 3,
          tile[row][col],
          gameFieldState,
          setGameFieldState
        );
      }
    }
  }
};

const removeRows = (gameFieldState, setGameFieldState, setLines) => {
  // For every row from up to bottom
  for (let row = 0; row < 21; row++) {
    let shouldRemove = true;
    // For every pixel within this row
    for (let col = 0; col < 10; col++) {
      // If pixel != 3 (is not tile laying on the ground -> e.g. 0 if there is empty space)
      if (gameFieldState[row][col] !== 3) {
        // You should not remove this row from the field
        shouldRemove = false;
      }
    }

    // If the row is needed to be removed remove it
    if (shouldRemove) {
      for (let col = 0; col < 10; col++) {
        updateCell(row, col, 0, gameFieldState, setGameFieldState);
      }

      // Increment the lines counter
      setLines((prev) => prev + 1);

      // Then move everything above it one pixel down
      for (let row2 = row; row2 > 0; row2--) {
        for (let col2 = 0; col2 < 10; col2++) {
          updateCell(
            row2,
            col2,
            gameFieldState[row2 - 1][col2],
            gameFieldState,
            setGameFieldState
          );
        }
      }
    }
  }
};

// Check if moving tile down is allowed (needed for droping)
export const isMoveAllowed = (gameFieldState) => {
  const currentTile = [];

  // Add all coordinates of the tile moving to currentTile
  // From button to the top from left to right
  for (let row = 20; row >= 0; row--) {
    for (let col = 0; col < 10; col++) {
      if (gameFieldState[row][col] === 1 || gameFieldState[row][col] === 2) {
        currentTile.push([row, col]);
      }
    }
  }

  // If there is no tile on the screen return false to prevent app from stacking in an infinite loop
  if (currentTile.length === 0) {
    return false;
  }

  // Check if it can move further and return false if it cant
  let tileSize = currentTile.length;
  for (let i = 0; i < tileSize; i++) {
    if (
      currentTile[i][0] === 20 || // If this is the last row u cant move down
      gameFieldState[currentTile[i][0] + 1][currentTile[i][1]] === 3 // If u try to move down and there is a tile laying there, u cant move down
    ) {
      return false;
    }
  }
  return true;
};

// Move tile one step
export const move = (
  direction,
  gameFieldState,
  setGameFieldState,
  setGameState,
  level,
  setLines,
  setScore,
  nextTileIndex,
  setNextTileIndex
) => {
  const currentTile = [];
  const tileCenter = [];
  let moveAllowed = true;

  // Add all coordinates of the tile to currentTile
  // From button to the top from left to right
  for (let row = 20; row >= 0; row--) {
    for (let col = 0; col < 10; col++) {
      if (gameFieldState[row][col] === 1) {
        currentTile.push([row, col]);
      } else if (gameFieldState[row][col] === 2) {
        currentTile.push([row, col]);
        tileCenter.push(row);
        tileCenter.push(col);
      }
    }
  }

  // Check whether move is allowed
  let tileSize = currentTile.length;
  if (direction === "D") {
    for (let i = 0; i < tileSize; i++) {
      if (
        currentTile[i][0] === 20 || // If this is the last row u cant move down
        gameFieldState[currentTile[i][0] + 1][currentTile[i][1]] === 3 // If u try to move down and there is a tile laying there, u cant move down
      ) {
        moveAllowed = false;
        break;
      }
    }
  } else if (direction === "L") {
    for (let i = 0; i < tileSize; i++) {
      if (
        currentTile[i][1] === 0 || // If this is the first coloumn u can move left
        gameFieldState[currentTile[i][0]][currentTile[i][1] - 1] === 3 // If u try to move left and there is a tile laying there, u cant move left
      ) {
        moveAllowed = false;
        break;
      }
    }
  } else if (direction === "R") {
    for (let i = 0; i < tileSize; i++) {
      if (
        currentTile[i][1] === 9 || // If this is the last coloumn u can move right
        gameFieldState[currentTile[i][0]][currentTile[i][1] + 1] === 3 // If u try to move right and there is a tile laying there, u cant move right
      ) {
        moveAllowed = false;
        break;
      }
    }
  }

  // If alowed - move; Else - make its position permanent
  if (moveAllowed === true) {
    // Move down
    if (direction === "D") {
      for (let i = 0; i < tileSize; i++) {
        updateCell(
          currentTile[i][0] + 1,
          currentTile[i][1],
          1,
          gameFieldState,
          setGameFieldState
        );
        updateCell(
          currentTile[i][0],
          currentTile[i][1],
          0,
          gameFieldState,
          setGameFieldState
        );
      }

      tileCenter[0] !== undefined &&
        updateCell(
          tileCenter[0] + 1,
          tileCenter[1],
          2,
          gameFieldState,
          setGameFieldState
        ); // If there is center place it

      // Move left
    } else if (direction === "L") {
      for (let i = 0; i < tileSize; i++) {
        updateCell(
          currentTile[i][0],
          currentTile[i][1] - 1,
          1,
          gameFieldState,
          setGameFieldState
        );
        updateCell(
          currentTile[i][0],
          currentTile[i][1],
          0,
          gameFieldState,
          setGameFieldState
        );
      }

      tileCenter[0] !== undefined &&
        updateCell(
          tileCenter[0],
          tileCenter[1] - 1,
          2,
          gameFieldState,
          setGameFieldState
        ); // If there is center place it

      // Move right
    } else if (direction === "R") {
      for (let i = tileSize - 1; i >= 0; i--) {
        updateCell(
          currentTile[i][0],
          currentTile[i][1] + 1,
          1,
          gameFieldState,
          setGameFieldState
        );
        updateCell(
          currentTile[i][0],
          currentTile[i][1],
          0,
          gameFieldState,
          setGameFieldState
        );
      }

      tileCenter[0] !== undefined &&
        updateCell(
          tileCenter[0],
          tileCenter[1] + 1,
          2,
          gameFieldState,
          setGameFieldState
        ); // If there is center place it
    }

    // Dont move, change tiles position to permanent and remove rows that need to be removed
  } else if (moveAllowed === false && direction === "D") {
    for (let i = 0; i < tileSize; i++) {
      updateCell(
        currentTile[i][0],
        currentTile[i][1],
        3,
        gameFieldState,
        setGameFieldState
      );
    }

    // Update score
    setScore((prev) => prev + level * 3);

    // Remove rows
    removeRows(gameFieldState, setGameFieldState, setLines);

    // Place next tile
    placeTile(nextTileIndex, gameFieldState, setGameFieldState, setGameState);

    // Update the next tile state
    let next = Math.floor(Math.random() * 7); // random value from 0 to 6
    setNextTileIndex(next);
  }
};

// Turns the tile right
export const turn = (gameFieldState, setGameFieldState) => {
  const currentTile = [];
  const tileCenter = [];
  let moveAllowed = true;

  // Add all coordinates of the tile moving to currentTile
  for (let row = 0; row < 21; row++) {
    for (let col = 0; col < 10; col++) {
      if (gameFieldState[row][col] === 1) {
        currentTile.push([row, col]);
      } else if (gameFieldState[row][col] === 2) {
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
      // If current pixel is left, right, up or down 1st pixel from center
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
                gameFieldState[currentTile[i][0] - 1][currentTile[i][1] + 1]
              )
            ) {
              moveAllowed = false;
            }
          } else if (colDiff === -1) {
            if (
              ![0, 1].includes(
                gameFieldState[currentTile[i][0] + 1][currentTile[i][1] - 1]
              )
            ) {
              moveAllowed = false;
            }
          }
        } else if (colDiff === 0) {
          if (rowDiff === 1) {
            if (
              ![0, 1].includes(
                gameFieldState[currentTile[i][0] + 1][currentTile[i][1] + 1]
              )
            ) {
              moveAllowed = false;
            }
          } else if (rowDiff === -1) {
            if (
              ![0, 1].includes(
                gameFieldState[currentTile[i][0] - 1][currentTile[i][1] - 1]
              )
            ) {
              moveAllowed = false;
            }
          }
        }
      }
      // AND both of them is true
      // If current pixel is diagonally 1st pixel from center
      /*
              []  []
                []
              []  []
            */
      else if (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1) {
        if (rowDiff === 1 && colDiff === 1) {
          if (
            ![0, 1].includes(
              gameFieldState[tileCenter[0] - 1][tileCenter[1] + 1]
            )
          ) {
            moveAllowed = false;
          }
        } else if (rowDiff === 1 && colDiff === -1) {
          if (
            ![0, 1].includes(
              gameFieldState[tileCenter[0] + 1][tileCenter[1] + 1]
            )
          ) {
            moveAllowed = false;
          }
        } else if (rowDiff === -1 && colDiff === -1) {
          if (
            ![0, 1].includes(
              gameFieldState[tileCenter[0] + 1][tileCenter[1] - 1]
            )
          ) {
            moveAllowed = false;
          }
        } else if (rowDiff === -1 && colDiff === 1) {
          if (
            ![0, 1].includes(
              gameFieldState[tileCenter[0] - 1][tileCenter[1] - 1]
            )
          ) {
            moveAllowed = false;
          }
        }
      }
      // If this is a 2nd pixels from center
      /*
              []  []

              []
            */
      else if (Math.abs(rowDiff) === 2 || Math.abs(colDiff) === 2) {
        if (rowDiff === -2) {
          if (
            ![0, 1].includes(
              gameFieldState[currentTile[i][0] - 2][currentTile[i][1] + 2]
            )
          ) {
            moveAllowed = false;
          }
        } else {
          if (
            ![0, 1].includes(
              gameFieldState[currentTile[i][0] + 2][currentTile[i][1] - 2]
            )
          ) {
            moveAllowed = false;
          }
        }
      }
    }

    // Turn the tile
    if (moveAllowed) {
      for (let i = 0; i < tileSize; i++) {
        updateCell(
          currentTile[i][0],
          currentTile[i][1],
          0,
          gameFieldState,
          setGameFieldState
        );
      }

      for (let i = 0; i < tileSize; i++) {
        let rowDiff = tileCenter[0] - currentTile[i][0];
        let colDiff = tileCenter[1] - currentTile[i][1];
        // XOR only one of them is true
        // If current pixel is left, right, up or down 1st pixel from center
        /*
                  []
                [][][]
                  []
                */
        if ((Math.abs(rowDiff) === 1) ^ (Math.abs(colDiff) === 1)) {
          if (rowDiff === 0) {
            if (colDiff === 1) {
              updateCell(
                currentTile[i][0] - 1,
                currentTile[i][1] + 1,
                1,
                gameFieldState,
                setGameFieldState
              );
            } else if (colDiff === -1) {
              updateCell(
                currentTile[i][0] + 1,
                currentTile[i][1] - 1,
                1,
                gameFieldState,
                setGameFieldState
              );
            }
          } else if (colDiff === 0) {
            if (rowDiff === 1) {
              updateCell(
                currentTile[i][0] + 1,
                currentTile[i][1] + 1,
                1,
                gameFieldState,
                setGameFieldState
              );
            } else if (rowDiff === -1) {
              updateCell(
                currentTile[i][0] - 1,
                currentTile[i][1] - 1,
                1,
                gameFieldState,
                setGameFieldState
              );
            }
          }
        }
        // AND both of them is true
        // If current pixel is diagonally 1st pixel from center
        /*
                []  []
                  []
                []  []
                */
        else if (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1) {
          if (rowDiff === 1 && colDiff === 1) {
            updateCell(
              tileCenter[0] - 1,
              tileCenter[1] + 1,
              1,
              gameFieldState,
              setGameFieldState
            );
          } else if (rowDiff === 1 && colDiff === -1) {
            updateCell(
              tileCenter[0] + 1,
              tileCenter[1] + 1,
              1,
              gameFieldState,
              setGameFieldState
            );
          } else if (rowDiff === -1 && colDiff === -1) {
            updateCell(
              tileCenter[0] + 1,
              tileCenter[1] - 1,
              1,
              gameFieldState,
              setGameFieldState
            );
          } else if (rowDiff === -1 && colDiff === 1) {
            updateCell(
              tileCenter[0] - 1,
              tileCenter[1] - 1,
              1,
              gameFieldState,
              setGameFieldState
            );
          }
        }
        // If this is a 2nd pixels from center
        /*
                []  []

                []
                */
        else if (Math.abs(rowDiff) === 2 || Math.abs(colDiff) === 2) {
          if (rowDiff === -2) {
            updateCell(
              currentTile[i][0] - 2,
              currentTile[i][1] + 2,
              1,
              gameFieldState,
              setGameFieldState
            );
          } else {
            updateCell(
              currentTile[i][0] + 2,
              currentTile[i][1] - 2,
              1,
              gameFieldState,
              setGameFieldState
            );
          }
        }
      }
    }
  }
};
