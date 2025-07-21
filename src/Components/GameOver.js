import { useEffect } from "react";

const GameOver = ({ setGameState }) => {
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

  // Go to intro on Enter
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
    myComponent.classList.add(`text-${newColor}`);
    myComponent.classList.remove(`text-${oldColor}`);

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
      className="flex items-center justify-center flex-col min-h-[85vh]"
    >
      <img src="/image-2.jpg" class="w-14 mb-[-130px] mr-[-154px]"></img>

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
    </div>
  );
};

export default GameOver;
