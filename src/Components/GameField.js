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
  // Logical representation of the game field (21x10 grid filled with numbers)
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

  // If not paused show the tiles
  if (pause === false) {
    for (let row = 1; row < 21; row++) {
      gameField += "<!";
      for (let col = 0; col < 10; col++) {
        gameField += gameFieldState[row][col] === 0 ? " ." : "[]";
      }
      gameField += "!>\n";
    }
  } else {
    // If paused show the empty field
    for (let row = 1; row < 21; row++) {
      gameField += "<!";
      for (let col = 0; col < 10; col++) {
        gameField += "  ";
      }
      gameField += "!>\n";
    }
  }
  gameField +=
    "<!====================!>\n" + "  \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\n";

  // If speeding up stop regular falling interval and set the other one that is faster
  const [isSpeedingUp, setIsSpeedingUp] = useState(false);

  // Set interval to move tile down
  useEffect(() => {
    let interval;
    if (pause === false && isSpeedingUp === false) {
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
  }, [level, nextTileIndex, pause, isSpeedingUp]);

  // Set interval to move tile down faster (soft drop)
  useEffect(() => {
    let interval;

    if (pause === false && isSpeedingUp === true) {
      // Move 1 pixel down before setting the interval to escape the dellay
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
        // Increment score (Soft Drop - 1 x Distance)
        setScore((prev) => prev + 1 * level);
      }, 50);
    }

    // Clean up
    return () => clearInterval(interval);
  }, [nextTileIndex, pause, isSpeedingUp]);

  // Needed to control the intervals for moving left or right
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);

  // Set intervals for moving left or right
  useEffect(() => {
    let interval;
    let timeout;

    let intervalTime = 50;
    let timoutTime = 150;

    // If not paused and isMovingLeft -> move left 1 pixel, and then set interval to move left after some timeout
    if (pause === false && isMovingLeft === true) {
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

      timeout = setTimeout(() => {
        interval = setInterval(() => {
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
        }, intervalTime);
      }, timoutTime);

      // If not paused and isMovingRight -> move right 1 pixel, and then set interval to move right after some timeout
    } else if (pause === false && isMovingRight === true) {
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

      timeout = setTimeout(() => {
        interval = setInterval(() => {
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
        }, intervalTime);
      }, timoutTime);
    }

    // Clean up
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [nextTileIndex, pause, isMovingLeft, isMovingRight]);

  // Change isSpeedingUp, setIsMovingLeft and setIsMovingRight to false every time when going in pause state to prevent bugs
  useEffect(() => {
    if (pause === true) {
      setIsSpeedingUp(false);
      setIsMovingLeft(false);
      setIsMovingRight(false);
    }
  }, [pause]);

  // Game controls for keyboard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        // Move left
        setIsMovingRight(false);
        setIsMovingLeft(true);
      } else if (event.key === "ArrowRight") {
        // Move right
        setIsMovingLeft(false);
        setIsMovingRight(true);
      } else if (event.key === "ArrowUp") {
        // Turn
        turn(gameFieldState, setGameFieldState);
      } else if (event.key === "ArrowDown") {
        // Soft Drop
        setIsSpeedingUp(true);
      } else if (event.key === " ") {
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

    const handleKeyUp = (event) => {
      if (event.key === "ArrowLeft") {
        // Stop moving left
        setIsMovingLeft(false);
      } else if (event.key === "ArrowRight") {
        // Stop moving right
        setIsMovingRight(false);
      } else if (event.key === "ArrowDown") {
        // Stop Soft Drop
        setIsSpeedingUp(false);
      }
    };

    if (pause === false) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [level, nextTileIndex, pause]);

  // Game controls for mobile
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const touchCurrentY = useRef(0);
  const touchStartTime = useRef(0);
  const touchEndTime = useRef(0);
  const movedWhileTouching = useRef(false);
  const isAllowedToDrop = useRef(false);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const minSwipeDistance = 30; // prev 35
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

      // Log the start time
      touchStartTime.current = new Date();

      // Log coordinates of where the touch started
      touchStartX.current = event.changedTouches[0].screenX;
      touchStartY.current = event.changedTouches[0].screenY;

      setIsSwipeActive(true);
    };

    const handleTouchMove = (event) => {
      if (!isSwipeActive) return;

      event.preventDefault();

      // Log current coordinates
      touchCurrentX.current = event.changedTouches[0].screenX;
      touchCurrentY.current = event.changedTouches[0].screenY;

      // Find how far the the finger swiped from previous position
      const diffX = touchCurrentX.current - touchStartX.current;
      const diffY = touchCurrentY.current - touchStartY.current;

      // If it swiped far enough
      if (
        Math.abs(diffX) > minSwipeDistance ||
        Math.abs(diffY) > minSwipeDistance
      ) {
        // Log in current coordinates as starting coordinates to be able to move several pixels in one swipe
        touchStartX.current = event.changedTouches[0].screenX;
        touchStartY.current = event.changedTouches[0].screenY;

        movedWhileTouching.current = true; // Needed in handleTouchEnd to know if this is a swipe (move) or a touch (turn)

        // If you swiped to the side
        if (
          Math.abs(diffX) > Math.abs(diffY) &&
          Math.abs(diffX) > minSwipeDistance
        ) {
          if (diffX > 0) {
            // If you swiped to the right
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
            // If you swiped to the left
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
          // If you swiped down
        } else if (
          Math.abs(diffY) > Math.abs(diffX) &&
          Math.abs(diffY) > minSwipeDistance
        ) {
          if (diffY > 0) {
            setIsSpeedingUp(true);

            // If passed checks for soft drop - passed checks for hard drop
            isAllowedToDrop.current = true;
          }
        }
      }
    };

    const handleTouchEnd = (event) => {
      if (!isSwipeActive) return;
      event.preventDefault();

      // Log the end time
      touchEndTime.current = new Date();

      if (movedWhileTouching.current === false) {
        // Turn if no swipe was detected
        turn(gameFieldState, setGameFieldState);
        // Else if the movement was fast  and passed checks in handleTouchMove - perform Hard Drop
      } else if (
        touchEndTime.current - touchStartTime.current < 200 &&
        isAllowedToDrop.current == true
      ) {
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

      setIsSpeedingUp(false);
      isAllowedToDrop.current = false;
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
  const isTilePlaced = useRef(false); // Track if initial tile is placed (to prevent bugs when useEffect hook runs twice)
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
