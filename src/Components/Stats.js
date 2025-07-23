const Stats = ({ lines, level, score }) => {
  const stats =
    `FULL LINES: ${lines}\n` + `LEVEL: ${level}\n` + `SCORE: ${score}\n`;

  return <pre>{stats}</pre>;
};

export default Stats;
