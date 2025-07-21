import { useEffect } from "react";

const GameOver = ({ setGameState, lines, level, score }) => {
  const gameOverLogo =
    "    [][][][][][]        [][][][]        [][]            [][]  [][][][][][][][]              [][][][]        [][]            [][]    [][][][][][][][]    [][][][][][]    \n" +
    "    [][][][][][]        [][][][]        [][]            [][]  [][][][][][][][]              [][][][]        [][]            [][]    [][][][][][][][]    [][][][][][]    \n" +
    "[][]                [][]        [][]    [][][][]    [][][][]  [][]                      [][]        [][]    [][]            [][]    [][]                [][]        [][]\n" +
    "[][]                [][]        [][]    [][][][]    [][][][]  [][]                      [][]        [][]    [][]            [][]    [][]                [][]        [][]\n" +
    "[][]    [][][][]    [][][][][][][][]    [][]    [][]    [][]  [][][][][][][][]          [][]        [][]        [][]    [][]        [][][][][][][][]    [][][][][][]    \n" +
    "[][]    [][][][]    [][][][][][][][]    [][]    [][]    [][]  [][][][][][][][]          [][]        [][]        [][]    [][]        [][][][][][][][]    [][][][][][]    \n" +
    "[][]        [][]    [][]        [][]    [][]            [][]  [][]                      [][]        [][]        [][]    [][]        [][]                [][]    [][]    \n" +
    "[][]        [][]    [][]        [][]    [][]            [][]  [][]                      [][]        [][]        [][]    [][]        [][]                [][]    [][]    \n" +
    "    [][][][]        [][]        [][]    [][]            [][]  [][][][][][][][]              [][][][]                [][]            [][][][][][][][]    [][]        [][]\n" +
    "    [][][][]        [][]        [][]    [][]            [][]  [][][][][][][][]              [][][][]                [][]            [][][][][][][][]    [][]        [][]\n";

  const count =
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

  const changeLogoColor = (oldColor, newColor) => {
    const myComponent = document.getElementById("my-component");

    switch (newColor) {
      case "lime-500":
        myComponent.style.color = "#84cc16"; // lime-500
        break;
      case "lime-800":
        myComponent.style.color = "#3f6212"; // lime-800
        break;
      case "lime-900":
        myComponent.style.color = "#365314"; // lime-900
        break;
    }

    const heartPixels = document.getElementsByClassName("heart-pixel");
    let len = heartPixels.length;
    for (let i = 0; i < len; i++) {
      heartPixels[i].classList.add(`bg-${newColor}`);
      heartPixels[i].classList.remove(`bg-${oldColor}`);
    }
  };

  const handleMouseEnter = () => {
    changeLogoColor("lime-500", "lime-800");
  };

  const handleMouseLeave = () => {
    changeLogoColor("lime-800", "lime-500");
  };

  const handleMouseDown = () => {
    changeLogoColor("lime-800", "lime-900");
  };

  const handleClick = () => {
    setGameState("intro");
  };
  return (
    <div
      id="my-component"
      className="flex items-center justify-center flex-col min-h-screen"
    >
      <pre
        className="text-xs mb-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        {gameOverLogo}
      </pre>

      <div
        className="flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        <div className="text-3xl pr-3">PLEASE TRY AGAIN</div>

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

      <pre className="mt-24  mr-[10.6rem] text-lime-500">{count}</pre>
    </div>
  );
};

export default GameOver;
