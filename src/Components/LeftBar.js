const LeftBar = ({ lines, level, score }) => {
  const leftBar =
    `FULL LINES: ${lines}\n` + `LEVEL: ${level}\n` + `SCORE: ${score}\n`;

  return <pre>{leftBar}</pre>;
};

export default LeftBar;
