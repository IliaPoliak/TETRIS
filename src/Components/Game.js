import Stats from "./Stats";
import NextTile from "./NextTile";
import GameField from "./GameField";
import PlayLogo from "./PlayLogo";
import { useState, useEffect, useRef } from "react";

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

  // "||" | "3" | "2" | "1"
  const [pauseLogo, setPauseLogo] = useState("||");
  const [pause, setPause] = useState(false);
  const pauseButtonRef = useRef(null); // Ref for pause button to be able to interact with it on touch screens without falling under prevent defult

  const [isCountingDown, setIsCountingDown] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to trigger an unpauseing process (countdown)
  const unpause = async () => {
    if (!isCountingDown) {
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
  };

  // Pause and unpause on Esc key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (!pause) {
          setPause(true);
        } else {
          unpause();
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
      {/* Show the unpause logo or countdown above everything else when in pause state */}
      {pause === true && (
        <div onClick={unpause} className="absolute text-6xl mb-24">
          {pauseLogo !== "||" ? (
            pauseLogo
          ) : (
            <PlayLogo size={1} color={"lime-500"}></PlayLogo>
          )}
        </div>
      )}

      <div className="flex justify-center items-center min-h-[95vh]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          {/* Mobile View: Stats, Next Tile and Pause Button */}
          <div className="flex sm:hidden">
            <button
              ref={pauseButtonRef}
              className={`m-3 text-4xl ${
                pause ? "text-lime-950" : "text-lime-500"
              }`}
              onClick={() => {
                setPause(true);
              }}
            >
              ||
            </button>

            <div className={`m-3 ${pause ? "text-lime-950" : "text-lime-500"}`}>
              <Stats lines={lines} level={level} score={score} />
            </div>

            <div className={`m-3 ${pause ? "text-lime-950" : "text-lime-500"}`}>
              <NextTile nextTileIndex={nextTileIndex} />
            </div>
          </div>

          {/* Desktop View: Stats */}
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
              pauseButtonRef={pauseButtonRef}
            />
          </div>

          {/* Desktop View: Next Tile */}
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
