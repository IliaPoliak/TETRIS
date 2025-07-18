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

// Move tile one step
export const move = (direction, gameFieldState, setGameFieldState) => {
  const currentTile = [];
  const tileCenter = [];
  let moveAllowed = true;

  // Add all coordinates of the tile to currentTile
  // From button to the top from left to right
  for (let row = 19; row >= 0; row--) {
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
        currentTile[i][0] === 19 || // If this is the last row u cant move down
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
    // removeRows();

    // let tileIndex = Math.floor(Math.random() * 7); // random value from 0 to 6
    // tile = tiles[tileIndex];
    // placeTile(tileIndex);
  }
};

// Check if moving tile down is allowed
export const isMoveAllowed = (gameFieldState) => {
  const currentTile = [];

  // Add all coordinates of the tile moving to currentTile
  // From button to the top from left to right
  for (let row = 19; row >= 0; row--) {
    for (let col = 0; col < 10; col++) {
      if (gameFieldState[row][col] === 1 || gameFieldState[row][col] === 2) {
        currentTile.push([row, col]);
      }
    }
  }

  // Check if it can move further and return false if it cant
  let tileSize = currentTile.length;
  for (let i = 0; i < tileSize; i++) {
    if (
      currentTile[i][0] === 19 || // If this is the last row u cant move down
      gameFieldState[currentTile[i][0] + 1][currentTile[i][1]] === 3 // If u try to move down and there is a tile laying there, u cant move down
    ) {
      return false;
    }
  }
  return true;
};

// Turns the tile right
export const turn = (gameFieldState, setGameFieldState) => {
  const currentTile = [];
  const tileCenter = [];
  let moveAllowed = true;

  // Add all coordinates of the tile moving to currentTile
  for (let row = 0; row < 20; row++) {
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
