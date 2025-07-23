import Stats from "./Stats";
import NextTile from "./NextTile";
import GameField from "./GameField";
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

  return (
    <div className="flex justify-center items-center min-h-[95vh]">
      <div className="flex">
        <div className="mx-2.5 min-w-32">
          <Stats lines={lines} level={level} score={score} />
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

        <div className="mx-2.5 min-w-32">
          <NextTile nextTileIndex={nextTileIndex} />
        </div>
      </div>
    </div>
  );
};

export default Game;
