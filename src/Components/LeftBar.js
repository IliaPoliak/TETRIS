const LeftBar = () => {
  const lines = 0;
  const level = 0;
  const score = 0;

  const leftBar =
    `FULL LINES: ${lines}\n` + `LEVEL: ${level}\n` + `SCORE: ${score}\n`;

  return <pre>{leftBar}</pre>;
};

export default LeftBar;
