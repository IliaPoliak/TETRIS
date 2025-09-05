import { tiles } from "../utils";

const NextTile = ({ nextTileIndex }) => {
  // Get the next tile from "tiles" array and "nextTileIndex" state
  const tile = tiles[nextTileIndex];

  let nextTileDesktopPrefix =
    "        \n" + "        \n" + "        \n" + "        \n" + "        \n";

  let nextTile =
    `${tile[0][0] === 0 ? "  " : "[]"}` +
    `${tile[0][1] === 0 ? "  " : "[]"}` +
    `${tile[0][2] === 0 ? "  " : "[]"}` +
    `${tile[0][3] === 0 ? "  " : "[]"}\n` +
    `${tile[1][0] === 0 ? "  " : "[]"}` +
    `${tile[1][1] === 0 ? "  " : "[]"}` +
    `${tile[1][2] === 0 ? "  " : "[]"}` +
    `${tile[1][3] === 0 ? "  " : "[]"}`;

  return (
    <>
      {/* Mobile View */}
      <pre className="sm:hidden block">{nextTile}</pre>

      {/* Desktop View */}
      <pre className="hidden sm:block">{nextTileDesktopPrefix + nextTile}</pre>
    </>
  );
};

export default NextTile;
