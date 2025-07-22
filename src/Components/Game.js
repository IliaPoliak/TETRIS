import LeftBar from "./LeftBar";
import NextTile from "./NextTile";
import GameField from "./GameField";
import RightBar from "./RightBar";
import { useState, useEffect } from "react";

const Game = ({
  setGameState,
  lines,
  setLines,
  level,
  setLevel,
  score,
  setScore,
}) => {
  const [nextTileIndex, setNextTileIndex] = useState(0);
  const [nextTileVisible, setNextTileVisible] = useState(false);

  // Toggle next tile visibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "1") {
        setNextTileVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[95vh]">
      <div className="flex">
        <div className="mx-2.5">
          <LeftBar lines={lines} level={level} score={score} />
        </div>

        <div className="mx-2.5">
          <NextTile
            nextTileIndex={nextTileIndex}
            nextTileVisible={nextTileVisible}
          />
        </div>

        <div className="mx-2.5">
          <GameField
            setGameState={setGameState}
            lines={lines}
            setLines={setLines}
            level={level}
            setLevel={setLevel}
            setScore={setScore}
            nextTileIndex={nextTileIndex}
            setNextTileIndex={setNextTileIndex}
          />
        </div>

        <div className="mx-10">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Game;
