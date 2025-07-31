import { useState } from "react";

const Menu = ({ setGameState }) => {
  // "menu" | "how to play" | "scoring"
  const [menuState, setMenuState] = useState("menu");

  const scoring =
    "Soft Drop       1 x Distance\n" +
    "----------------------------\n" +
    "Hard Drop       2 x Distance\n" +
    "----------------------------\n" +
    "Single Line Clear        100\n" +
    "----------------------------\n" +
    "Double Line Clear        300\n" +
    "----------------------------\n" +
    "Triple Line Clear        500\n";

  const footer = "*Scores are multiplied by the level";

  const controls =
    "   KEYBOARD CONTROL            \n" +
    "                               \n" +
    "Arrow Up    /\\     Rotate Right\n" +
    "Arrow Left  <-        Move Left\n" +
    "Arrow Right ->       Move Right\n" +
    "Arrow Down  \\/        Soft Drop\n" +
    "Space                 Hard Drop\n" +
    "Esc                       Pause\n" +
    "                                         \n" +
    "                                         \n" +
    "    SWIPE CONTROL                        \n" +
    "                                         \n" +
    "<span style='color: #4d7c0f'>Move:</span> Slide your finger left and right   \n" +
    "<span style='color: #4d7c0f'>Rotate:</span> Tap the screen                   \n" +
    "<span style='color: #4d7c0f'>Soft Drop:</span> Slide your finger down        \n" +
    "<span style='color: #4d7c0f'>Hard Drop:</span> Flick your finger down quickly\n";

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <button
        onClick={() => {
          if (menuState === "menu") {
            setGameState("intro");
          } else {
            setMenuState("menu");
          }
        }}
        className="absolute left-8 top-5 text-7xl hover:text-lime-700 active:text-lime-900"
      >
        &lt;
      </button>

      {menuState === "menu" && (
        <>
          <button
            onClick={() => {
              setMenuState("how to play");
            }}
            className="w-52 border-2 border-lime-500 py-2 text-3xl hover:bg-lime-500 hover:text-black active:bg-lime-600 active:text-black mb-5"
          >
            HOW TO PLAY
          </button>

          <button
            onClick={() => {
              setMenuState("scoring");
            }}
            className="w-52 border-2 border-lime-500 py-2 text-3xl hover:bg-lime-500 hover:text-black active:bg-lime-600 active:text-black tracking-widest mb-5"
          >
            SCORING
          </button>
        </>
      )}

      {menuState === "how to play" && (
        <pre
          className="text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: controls }}
        ></pre>
      )}

      {menuState === "scoring" && (
        <>
          <pre className="">{scoring}</pre>
          <pre className="text-xs mt-10">{footer}</pre>
        </>
      )}
    </div>
  );
};

export default Menu;
