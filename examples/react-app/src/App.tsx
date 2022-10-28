import mizuki from "mizuki";
import React from "react";

// declare mizuki engines

const slowMizuki = mizuki();

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
