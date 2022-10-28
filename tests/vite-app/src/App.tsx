import "./App.css";

import mizuki from "mizuki";
import React from "react";

// declare mizuki engines
const fastMizuki = mizuki({ delay: 100, max: 3, min: -3, init: 2, loop: true }); // globally
const slowMizuki = mizuki();

// instantiate engines to be used all over the app

// function App() {
//   const [fastIndex, fastSetIndex] = React.useState<number>(0);
//   const [slowIndex, slowSetIndex] = React.useState<number>(0);

//   // getters and setters
//   const [fastGet, fastSet] = React.useMemo(() => fastMizuki(), []);
//   const [slowGet, slowSet] = React.useMemo(
//     () =>
//       slowMizuki({
//         delay: 500,
//         min: 0,
//         max: 3,
//         init: 3,
//         loop: true,
//       }), // dynamically
//     []
//   );

//   // init
//   React.useEffect(() => {
//     fastSetIndex(fastGet());
//     slowSetIndex(slowGet());
//   }, []);

//   const fastIncrement = () => {
//     fastSet((idx) => idx + 1); // this is non-reactive
//     fastSetIndex(fastGet()); // setState to rerender
//   };

//   const fastDecrement = () => {
//     fastSet((idx) => idx - 1);
//     fastSetIndex(fastGet());
//   };

//   const slowIncrement = () => {
//     slowSet((idx) => idx + 1);
//     slowSetIndex(slowGet());
//   };

//   const slowDecrement = () => {
//     slowSet((idx) => idx - 1);
//     slowSetIndex(slowGet());
//   };
//   return (
//     <div className="App">
//       <div>
//         FAST
//         <button onClick={fastIncrement}>+</button>
//         <button onClick={fastDecrement}>-</button>
//       </div>
//       <div>fast counter: {fastIndex}</div>
//       <div>
//         SLOW
//         <button onClick={slowIncrement}>+</button>
//         <button onClick={slowDecrement}>-</button>
//       </div>
//       <div>slow counter: {slowIndex}</div>
//       <Scroller />
//     </div>
//   );
// }

export default function Scroller() {
  const [index, setIndex] = React.useState(0);

  const [get, set] = React.useMemo(
    () =>
      slowMizuki({
        delay: 1000,
        min: 0,
        max: 3,
        init: 0,
        loop: false,
      }),
    []
  );

  const offsets = [0, -100, -200, -300];

  const next = () => {
    set((idx) => idx + 1);
    setIndex(get());
  };

  const prev = () => {
    set((idx) => idx - 1);
    setIndex(get());
  };

  const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      next();
    } else if (e.deltaY < 0) {
      prev();
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflowY: "hidden" }}>
      <div
        style={{
          transform: `translateY(${offsets[index]}vh)`,
          transitionDuration: "1s",
        }}
        onWheel={wheelHandler}
      >
        <div style={{ width: "100vw", height: "100vh", background: "red" }}>
          Kanade
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "green" }}>
          Mafuyu
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "blue" }}>
          Ena
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "yellow" }}>
          Mizuki
        </div>
      </div>
    </div>
  );
}
