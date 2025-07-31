import { useEffect } from "react";

const Intro = ({ setGameState }) => {
  const logoLg =
    "[][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][]  [][][][][][][][][]\n" +
    "[][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][]                    [][][]        [][][]      [][][]  [][][]  [][][]            \n" +
    "      [][][]        [][][]                    [][][]        [][][]      [][][]  [][][]  [][][]            \n" +
    "      [][][]        [][][][][][]              [][][]        [][][][][][]        [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][][][][]              [][][]        [][][][][][]        [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][]                    [][][]        [][][]      [][][]  [][][]              [][][]\n" +
    "      [][][]        [][][]                    [][][]        [][][]      [][][]  [][][]              [][][]\n" +
    "      [][][]        [][][][][][][][][]        [][][]        [][][]      [][][]  [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][][][][][][][]        [][][]        [][][]      [][][]  [][][]  [][][][][][][][][]\n";

  const logoMd =
    "[][][][][][]  [][][][][][]  [][][][][][]  [][][][][][]  [][]  [][][][][][]\n" +
    "[][][][][][]  [][][][][][]  [][][][][][]  [][][][][][]  [][]  [][][][][][]\n" +
    "    [][]      [][]              [][]      [][]    [][]  [][]  [][]        \n" +
    "    [][]      [][]              [][]      [][]    [][]  [][]  [][]        \n" +
    "    [][]      [][][][]          [][]      [][][][]      [][]  [][][][][][]\n" +
    "    [][]      [][][][]          [][]      [][][][]      [][]  [][][][][][]\n" +
    "    [][]      [][]              [][]      [][]    [][]  [][]          [][]\n" +
    "    [][]      [][]              [][]      [][]    [][]  [][]          [][]\n" +
    "    [][]      [][][][][][]      [][]      [][]    [][]  [][]  [][][][][][]\n" +
    "    [][]      [][][][][][]      [][]      [][]    [][]  [][]  [][][][][][]\n";

  const logoSm =
    "[][][]  [][][]  [][][]  [][][]  []  [][][]\n" +
    "  []    []        []    []  []  []  []    \n" +
    "  []    [][]      []    [][]    []  [][][]\n" +
    "  []    []        []    []  []  []      []\n" +
    "  []    [][][]    []    []  []  []  [][][]\n";

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

    // Clean Up
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] font-bold">
      {/* For medium screens and wider */}
      <pre className="md:block hidden mb-10 lg:leading-[1.25] lg:text-base md:text-xs">
        {logoLg}
      </pre>

      {/* For screens from small to medium */}
      <pre className="sm:block md:hidden hidden mb-10 text-xs">{logoMd}</pre>

      {/* For mobile screens */}
      <pre className="sm:hidden block mb-10 text-xs">{logoSm}</pre>

      <button
        onClick={() => setGameState("game")}
        className="w-52 border-2 border-lime-500 py-2 text-3xl hover:bg-lime-500 hover:text-black active:bg-lime-600 active:text-black tracking-widest mb-5"
        id="play-button"
      >
        PLAY
      </button>

      <button
        onClick={() => setGameState("menu")}
        className="w-52 border-2 border-lime-500 py-2 text-3xl hover:bg-lime-500 hover:text-black active:bg-lime-600 active:text-black tracking-widest"
      >
        MENU
      </button>
    </div>
  );
};

export default Intro;
