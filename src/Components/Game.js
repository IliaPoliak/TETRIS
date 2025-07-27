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
  const [pause, setPause] = useState(false);

  // "PAUSED" | "3" | "2" | "1"
  const [pauseLogo, setPauseLogo] = useState("||");

  const [isCountingDown, setIsCountingDown] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.key === "Escape") {
        if (!pause) {
          setPause(true);
        } else if (!isCountingDown) {
          setIsCountingDown(true);

          setPauseLogo("3");
          await sleep(1000);

          setPauseLogo("2");
          await sleep(1000);

          setPauseLogo("1");
          await sleep(1000);

          setPause(false);
          setPauseLogo("||");
          setIsCountingDown(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean Up
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pause, isCountingDown]);

  return (
    <div className="flex flex-col justify-center items-center">
      {pause === true && (
        <div className="absolute text-6xl mb-24">{pauseLogo}</div>
      )}

      <div className="flex justify-center items-center min-h-[95vh]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          {/* Shown in Mobile view */}
          <div className="flex sm:hidden">
            <div className={`m-3 ${pause ? "text-lime-950" : "text-lime-500"}`}>
              <Stats lines={lines} level={level} score={score} />
            </div>

            <div className={`m-3 ${pause ? "text-lime-950" : "text-lime-500"}`}>
              <NextTile nextTileIndex={nextTileIndex} />
            </div>
          </div>

          {/* Shown in Desktop view */}
          <div
            className={`min-w-32 sm:block hidden ${
              pause ? "text-lime-950" : "text-lime-500"
            }`}
          >
            <Stats lines={lines} level={level} score={score} />
          </div>

          <div
            className={`sm:mx-5 ${pause ? "text-lime-950" : "text-lime-500"}`}
          >
            <GameField
              setGameState={setGameState}
              lines={lines}
              setLines={setLines}
              level={level}
              setLevel={setLevel}
              setScore={setScore}
              nextTileIndex={nextTileIndex}
              setNextTileIndex={setNextTileIndex}
              pause={pause}
            />
          </div>

          {/* Shown in Desktop view */}
          <div
            className={`min-w-32 sm:block hidden ${
              pause ? "text-lime-950" : "text-lime-500"
            }`}
          >
            <NextTile nextTileIndex={nextTileIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
