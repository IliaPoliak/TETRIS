const Game = () => {
  // Visual representation of game field
  const gameField =
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . .[] . . . . .!>\n" +
    "<! . . .[][][] . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<! . . . . . . . . . .!>\n" +
    "<!====================!>\n" +
    "  \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\n";

  const lines = 0;
  const level = 0;
  const score = 0;

  const leftBar =
    `FULL LINES: ${lines}\n` + `LEVEL: ${level}\n` + `SCORE: ${score}\n`;

  const rightBar =
    "                      \n" +
    "7: LEFT  9: RIGHT\n" +
    "      8:TURN        \n" +
    "  4: SOFT DROP\n" +
    "  5: HARD DROP\n" +
    "  1: SHOW NEXT\n" +
    "0: HIDE THIS TEXT\n" +
    " SPACE: HARD DROP ";

  const tile = [
    [0, 0, 1, 0],
    [0, 1, 1, 1],
  ];

  const nextTile =
    "        \n" +
    "        \n" +
    "        \n" +
    "        \n" +
    "        \n" +
    "        \n" +
    "        \n" +
    "        \n" +
    "        \n" +
    "        \n" +
    `${tile[0][0] === 0 ? "  " : "[]"}` +
    `${tile[0][1] === 0 ? "  " : "[]"}` +
    `${tile[0][2] === 0 ? "  " : "[]"}` +
    `${tile[0][3] === 0 ? "  " : "[]"}\n` +
    `${tile[1][0] === 0 ? "  " : "[]"}` +
    `${tile[1][1] === 0 ? "  " : "[]"}` +
    `${tile[1][2] === 0 ? "  " : "[]"}` +
    `${tile[1][3] === 0 ? "  " : "[]"}`;

  return (
    <div className="flex justify-center items-center min-h-[95vh]">
      <div className="flex">
        <pre className="mx-2.5">{leftBar}</pre>
        <pre className="mx-2.5">{nextTile}</pre>
        <pre className="mx-2.5">{gameField}</pre>
        <pre className="mx-10">{rightBar}</pre>
      </div>
    </div>
  );
};

export default Game;
