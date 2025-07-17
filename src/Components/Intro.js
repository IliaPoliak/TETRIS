const Intro = ({ setGameState }) => {
  // the logo looks skewed in the vs code because the characters are not of equal length (in browser it looks okay with <pre> tag)
  const logo =
    "[][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][]  [][][][][][][][][]\n" +
    "[][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][][][][][][][]  [][][]  [][][][][][][][][]\n" +
    "      [][][]	    [][][]                    [][][]        [][][]      [][][]  [][][]  [][][]            \n" +
    "      [][][]        [][][]                    [][][]        [][][]      [][][]  [][][]  [][][]            \n" +
    "      [][][]        [][][][][][]	          [][][]        [][][][][][]        [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][][][][]	          [][][]        [][][][][][]        [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][]		              [][][]        [][][]      [][][]  [][][]  	        [][][]\n" +
    "      [][][]        [][][]		              [][][]        [][][]      [][][]  [][][]  	        [][][]\n" +
    "      [][][]        [][][][][][][][][]	      [][][]        [][][]      [][][]  [][][]  [][][][][][][][][]\n" +
    "      [][][]        [][][][][][][][][]	      [][][]        [][][]      [][][]  [][][]  [][][][][][][][][]\n";

  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] font-bold">
      <pre className="mb-10">{logo}</pre>

      <button
        onClick={() => setGameState("game")}
        className="border-2 border-lime-500 w-52 py-2 text-3xl hover:bg-lime-500 hover:text-black active:bg-lime-400 tracking-widest mb-5 "
      >
        PLAY
      </button>

      <button className="border-2 border-lime-500 w-52 py-2 text-3xl hover:bg-lime-500 hover:text-black active:bg-lime-400 tracking-widest">
        OPTIONS
      </button>
    </div>
  );
};

export default Intro;
