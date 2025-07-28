import { useState, useEffect, useRef } from "react";
import { placeTile, move, isMoveAllowed, turn } from "../utils";

const GameField = ({
  setGameState,
  lines,
  setLines,
  level,
  setLevel,
  setScore,
  nextTileIndex,
  setNextTileIndex,
  pause,
  pauseButtonRef,
}) => {
  // Logical representation of the game field (20x10 grid filled with numbers)
  // 0 - Empty
  // 1 - Falling Tile
  // 2 - Center of the Tile Falling (needed for turning)
  // 3 - Laying Tiles
  const [gameFieldState, setGameFieldState] = useState(() =>
    // Added 21st row (not visible) above. Tiles will appear there if there is no more place to appear
    Array(21)
      .fill(null)
      .map(() => Array(10).fill(0))
  );

  // Visual representation of game field
  let gameField = "";

  if (pause === false) {
    for (let row = 1; row < 21; row++) {
      gameField += "<!";
      for (let col = 0; col < 10; col++) {
        gameField += gameFieldState[row][col] === 0 ? " ." : "[]";
      }
      gameField += "!>\n";
    }
  } else {
    // If paused show empy field
    for (let row = 0; row < 20; row++) {
      gameField += "<!";
      for (let col = 0; col < 10; col++) {
        gameField += "  ";
      }
      gameField += "!>\n";
    }
  }
  gameField +=
    "<!====================!>\n" + "  \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\n";

  // Set interval to move tile down
  useEffect(() => {
    let interval;
    if (pause === false) {
      interval = setInterval(() => {
        move(
          "D",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
        // The speed of the tile depends on level, starting with 0.8 seconds per pixel
      }, 800 - 35 * (level > 20 ? 20 : level));
    }
    // Clean up
    return () => clearInterval(interval);
  }, [level, nextTileIndex, pause]);

  // Game controls for keyboard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["7", "ArrowLeft"].includes(event.key)) {
        // Move left
        move(
          "L",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
      } else if (["9", "ArrowRight"].includes(event.key)) {
        // Move right
        move(
          "R",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
      } else if (["8", "ArrowUp"].includes(event.key)) {
        // Turn
        turn(gameFieldState, setGameFieldState);
      } else if (["4", "ArrowDown"].includes(event.key)) {
        // Soft Drop
        move(
          "D",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
        // Increment score (Soft Drop - 1 x Distance)
        setScore((prev) => prev + 1 * level);
      } else if (["5", " "].includes(event.key)) {
        // Hard Drop
        while (isMoveAllowed(gameFieldState)) {
          move(
            "D",
            gameFieldState,
            setGameFieldState,
            setGameState,
            level,
            setLines,
            setScore,
            nextTileIndex,
            setNextTileIndex
          );
          // Increment score (Hard Drop - 2 x Distance)
          setScore((prev) => prev + 2 * level);
        }
        move(
          "D",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
      }
    };

    if (pause === false) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [level, nextTileIndex, pause]);

  // Game controls for mobile
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const touchCurrentY = useRef(0);
  const movedWhileTouching = useRef(false);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const minSwipeDistance = 25;
  useEffect(() => {
    const handleTouchStart = (event) => {
      // Skip preventDefault if touching the pause button
      if (
        pauseButtonRef.current &&
        (event.target === pauseButtonRef.current ||
          pauseButtonRef.current.contains(event.target))
      ) {
        return;
      }
      event.preventDefault();

      touchStartX.current = event.changedTouches[0].screenX;
      touchStartY.current = event.changedTouches[0].screenY;
      setIsSwipeActive(true);
    };

    const handleTouchMove = (event) => {
      if (!isSwipeActive) return;
      event.preventDefault();
      touchCurrentX.current = event.changedTouches[0].screenX;
      touchCurrentY.current = event.changedTouches[0].screenY;

      const diffX = touchCurrentX.current - touchStartX.current;
      const diffY = touchCurrentY.current - touchStartY.current;

      if (
        Math.abs(diffX) > minSwipeDistance ||
        Math.abs(diffY) > minSwipeDistance
      ) {
        touchStartX.current = event.changedTouches[0].screenX;
        touchStartY.current = event.changedTouches[0].screenY;
        movedWhileTouching.current = true;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            move(
              "R",
              gameFieldState,
              setGameFieldState,
              setGameState,
              level,
              setLines,
              setScore,
              nextTileIndex,
              setNextTileIndex
            );
          } else {
            move(
              "L",
              gameFieldState,
              setGameFieldState,
              setGameState,
              level,
              setLines,
              setScore,
              nextTileIndex,
              setNextTileIndex
            );
          }
        } else {
          if (diffY > 0) {
            move(
              "D",
              gameFieldState,
              setGameFieldState,
              setGameState,
              level,
              setLines,
              setScore,
              nextTileIndex,
              setNextTileIndex
            );
            // Increment score (Soft Drop - 1 x Distance)
            setScore((prev) => prev + 1 * level);
          }
        }
      }
    };

    const handleTouchEnd = (event) => {
      if (!isSwipeActive) return;
      event.preventDefault();

      if (movedWhileTouching.current === false) {
        // Turn
        turn(gameFieldState, setGameFieldState);
      }

      movedWhileTouching.current = false;
      setIsSwipeActive(false);
    };

    if (pause === false) {
      window.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    // Clean up
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [level, nextTileIndex, pause, isSwipeActive]);

  // Calculate level every time lines number changes
  useEffect(() => {
    // Increment level every 10 lines
    setLevel(Number.parseInt(lines / 10) + 1);
  }, [lines]);

  // Place initial tile, so we have something to move
  const isTilePlaced = useRef(false); // Track if initial tile is placed (to prevent useEffect hook from running twice)
  useEffect(() => {
    if (isTilePlaced.current === false) {
      // Place initial tile
      let tileIndex = Math.floor(Math.random() * 7); // Random value from 0 to 6
      placeTile(tileIndex, gameFieldState, setGameFieldState, setGameState);

      // Set next tile index state
      let next = Math.floor(Math.random() * 7); // Random value from 0 to 6
      setNextTileIndex(next);

      // Mark as placed
      isTilePlaced.current = true;
    }
  }, []);

  return <pre>{gameField}</pre>;
};

export default GameField;
