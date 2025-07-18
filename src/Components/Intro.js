import { useEffect } from "react";

const Intro = ({ setGameState }) => {
  // The logo looks skewed in the vs code because the characters are not of equal length (in browser it looks okay with <pre> tag)
  const logo =
    "[][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][]  [][][][][][][][][]\n" +
    "[][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][]  [][][][][][][][][]\n" +
    "      [][][]	    [][][]                    [][][]        [][][]      [][][]  [][][]  [][][]            \n" +
    "      [][][]        [][][]                    [][][]        [][][]      [][][]  [][][]  [][][]            \n" +
    "      [][][]        [][][][][][]	          [][][]        [][][][][][]        [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][][][][]	          [][][]        [][][][][][]        [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][]		              [][][]        [][][]      [][][]  [][][]  	        [][][]\n" +
    "      [][][]        [][][]		              [][][]        [][][]      [][][]  [][][]  	        [][][]\n" +
    "      [][][]        [][][][][][][][][]	      [][][]        [][][]      [][][]  [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][][][][][][][]	      [][][]        [][][]      [][][]  [][][]  [][][][][][][][][]\n";

  // Play game on Enter
  useEffect(() => {
    // Hover over the play button on key down
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        document.getElementById("play-button").className =
          "border-2 border-lime-500 w-52 py-2 text-3xl bg-lime-500 text-black tracking-widest mb-5";
      }
    };

    // Trigger the game to start after keyup
    const handleKeyUp = (event) => {
      if (event.key === "Enter") {
        setGameState("game");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] font-bold">
      <pre className="mb-10">{logo}</pre>

      <button
        onClick={() => setGameState("game")}
        className="border-2 border-lime-500 w-52 py-2 text-3xl hover:bg-lime-500 hover:text-black active:bg-lime-400 tracking-widest mb-5"
        id="play-button"
      >
        PLAY
      </button>

      <button className="border-2 border-lime-500 w-52 py-2 text-3xl hover:bg-lime-500 hover:text-black active:bg-lime-400 tracking-widest">
        OPTIONS
      </button>
    </div>
  );
};

export default Intro;
