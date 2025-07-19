import LeftBar from "./LeftBar";
import NextTile from "./NextTile";
import GameField from "./GameField";
import RightBar from "./RightBar";

const Game = ({ setGameState }) => {
  return (
    <div className="flex justify-center items-center min-h-[95vh]">
      <div className="flex">
        <div className="mx-2.5">
          <LeftBar />
        </div>

        <div className="mx-2.5">
          <NextTile />
        </div>

        <div className="mx-2.5">
          <GameField setGameState={setGameState} />
        </div>

        <div className="mx-10">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Game;
