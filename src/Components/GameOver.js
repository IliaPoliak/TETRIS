import { useEffect } from "react";

const GameOver = ({ setGameState, lines, level, score }) => {
  const gameOverLogoXL =
    "    [][][][][][]        [][][][]        [][]            [][]  [][][][][][][][]            [][][][]        [][]            [][]    [][][][][][][][]    [][][][][][]    \n" +
    "    [][][][][][]        [][][][]        [][]            [][]  [][][][][][][][]            [][][][]        [][]            [][]    [][][][][][][][]    [][][][][][]    \n" +
    "[][]                [][]        [][]    [][][][]    [][][][]  [][]                    [][]        [][]    [][]            [][]    [][]                [][]        [][]\n" +
    "[][]                [][]        [][]    [][][][]    [][][][]  [][]                    [][]        [][]    [][]            [][]    [][]                [][]        [][]\n" +
    "[][]    [][][][]    [][][][][][][][]    [][]    [][]    [][]  [][][][][][][][]        [][]        [][]        [][]    [][]        [][][][][][][][]    [][][][][][]    \n" +
    "[][]    [][][][]    [][][][][][][][]    [][]    [][]    [][]  [][][][][][][][]        [][]        [][]        [][]    [][]        [][][][][][][][]    [][][][][][]    \n" +
    "[][]        [][]    [][]        [][]    [][]            [][]  [][]                    [][]        [][]        [][]    [][]        [][]                [][]    [][]    \n" +
    "[][]        [][]    [][]        [][]    [][]            [][]  [][]                    [][]        [][]        [][]    [][]        [][]                [][]    [][]    \n" +
    "    [][][][]        [][]        [][]    [][]            [][]  [][][][][][][][]            [][][][]                [][]            [][][][][][][][]    [][]        [][]\n" +
    "    [][][][]        [][]        [][]    [][]            [][]  [][][][][][][][]            [][][][]                [][]            [][][][][][][][]    [][]        [][]\n";

  const gameOverLogoMD =
    "  [][][]    [][]    []      []  [][][][]      [][]    []      []  [][][][]  [][][]  \n" +
    "[]        []    []  [][]  [][]  []          []    []  []      []  []        []    []\n" +
    "[]  [][]  [][][][]  []  []  []  [][][][]    []    []    []  []    [][][][]  [][][]  \n" +
    "[]    []  []    []  []      []  []          []    []    []  []    []        []  []  \n" +
    "  [][]    []    []  []      []  [][][][]      [][]        []      [][][][]  []    []\n";

  const gameOverLogoXS =
    "  [][][]    [][]    []      []  [][][][]\n" +
    "[]        []    []  [][]  [][]  []      \n" +
    "[]  [][]  [][][][]  []  []  []  [][][][]\n" +
    "[]    []  []    []  []      []  []      \n" +
    "  [][]    []    []  []      []  [][][][]\n" +
    "                                        \n" +
    "  [][]    []      []  [][][][]  [][][]  \n" +
    "[]    []  []      []  []        []    []\n" +
    "[]    []    []  []    [][][][]  [][][]  \n" +
    "[]    []    []  []    []        []  []  \n" +
    "  [][]        []      [][][][]  []    []\n";

  const stats =
    `> FULL LINES: ${lines}\n` + `> LEVEL: ${level}\n` + `> SCORE: ${score}\n`;

  // Go to Intro on Enter
  useEffect(() => {
    // Hover over the button on key down
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleMouseEnter();
      }
    };

    // Trigger the game to start after keyup
    const handleKeyUp = (event) => {
      if (event.key === "Enter") {
        handleClick();
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

  // Change style when interacting with button
  const changeLogoColor = (newColor) => {
    const myComponent = document.getElementById("button");
    const heartPixels = document.getElementsByClassName("heart-pixel");
    let len = heartPixels.length;
    let color = "";

    switch (newColor) {
      case "lime-500":
        color = "#84cc16"; // lime-500
        break;
      case "lime-800":
        color = "#3f6212"; // lime-800
        break;
      case "lime-900":
        color = "#365314"; // lime-900
        break;
    }

    myComponent.style.color = color;

    for (let i = 0; i < len; i++) {
      heartPixels[i].style.backgroundColor = color;
    }
  };

  // Handle interacting with button
  const handleMouseEnter = () => {
    changeLogoColor("lime-800");
  };

  const handleMouseLeave = () => {
    changeLogoColor("lime-500");
  };

  const handleMouseDown = () => {
    changeLogoColor("lime-900");
  };

  const handleClick = () => {
    setGameState("intro");
  };
  return (
    <div
      id="button"
      className="flex items-center justify-center flex-col min-h-screen"
    >
      {/* Screens from 1280px */}
      <pre
        className="xl:block hidden text-xs mb-10"
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        {gameOverLogoXL}
      </pre>

      {/* Screens from 640px to 1280px */}
      <pre
        className="xl:hidden sm:block hidden lg:text-xl md:text-base sm:text-xs lg:leading-[1.25] md:leading-[1.25] sm:leading-[1.25] mb-10"
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        {gameOverLogoMD}
      </pre>

      {/* Screens up to 640px */}
      <pre
        className="sm:hidden block text-sm mb-10"
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        {gameOverLogoXS}
      </pre>

      <div
        className="flex items-center"
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        <div className="text-3xl pr-3">PLEASE TRY AGAIN</div>

        {/* This table represent a pixel heart */}
        <table>
          <tbody>
            <tr>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
            </tr>
            <tr>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
            </tr>
            <tr>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
            </tr>
            <tr>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
            </tr>
            <tr>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
            </tr>
            <tr>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
            </tr>
            <tr>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
            </tr>
            <tr>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
            </tr>
            <tr>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
            </tr>
            <tr>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
            </tr>
            <tr>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
            </tr>

            <tr>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-lime-500 heart-pixel"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
              <td className="p-px bg-black"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre className="mt-24 mr-[10.6rem] text-lime-500">{stats}</pre>
    </div>
  );
};

export default GameOver;
