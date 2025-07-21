import LeftBar from "./LeftBar";
import NextTile from "./NextTile";
import GameField from "./GameField";
import RightBar from "./RightBar";

import { useState } from "react";

const Game = ({ setGameState }) => {
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <div className="flex justify-center items-center min-h-[95vh]">
      <div className="flex">
        <div className="mx-2.5">
          <LeftBar lines={lines} level={level} score={score} />
        </div>

        <div className="mx-2.5">
          <NextTile />
        </div>

        <div className="mx-2.5">
          <GameField
            setGameState={setGameState}
            setLines={setLines}
            setLevel={setLevel}
            setScore={setScore}
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
