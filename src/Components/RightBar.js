const RightBar = () => {
  const rightBar =
    "                      \n" +
    "7:LEFT  8:TURN 9:RIGHT\n" +
    "4:SPEED UP 5:DROP\n" +
    "1:LOOK AHEAD\n" +
    "0:HIDE THIS TEXT\n" +
    "   SPACE: DROP ";

  return <pre>{rightBar}</pre>;
};

export default RightBar;
