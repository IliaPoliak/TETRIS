import { useState, useEffect } from "react";

const RightBar = () => {
  const [rightBarVisible, setRightBarVisible] = useState(true);

  // Toggle right bar visibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "0") {
        setRightBarVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  let rightBar = "";
  if (rightBarVisible) {
    rightBar =
      "                      \n" +
      "7:LEFT  8:TURN 9:RIGHT\n" +
      "4:SPEED UP 5:DROP\n" +
      "1:LOOK AHEAD\n" +
      "0:HIDE THIS TEXT\n" +
      "   SPACE: DROP ";
  } else {
    rightBar = "                      ";
  }

  return <pre>{rightBar}</pre>;
};

export default RightBar;
