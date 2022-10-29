import mizuki from "mizuki";
import React from "react";

export default function Scroller() {
  const [index, setIndex] = React.useState(0);

  const { get, set } = React.useMemo(
    // needs useMemo to avoid cleanup on index
    () =>
      mizuki({
        delay: 1000,
        bounds: {
          min: 0,
          max: 3,
        },
        init: 0,
        loop: false,
      }),
    []
  );

  const offsets = [0, -100, -200, -300];

  const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      set((idx) => idx + 1);
      setIndex(get()); // needs setState to trigger a rerender
    } else if (e.deltaY < 0) {
      set((idx) => idx - 1);
      setIndex(get());
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflowY: "hidden" }}>
      <div
        onWheel={wheelHandler}
        style={{
          transform: `translateY(${offsets[index]}vh)`,
          transitionDuration: "1s",
          transition: "all 1s ease",
        }}
      >
        <div style={{ width: "100vw", height: "100vh", background: "#ff5f45" }}>
          Kanade
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "#0798ec" }}>
          Mafuyu
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "#fc6c7c" }}>
          Ena
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "#fec401" }}>
          Mizuki
        </div>
      </div>
    </div>
  );
}
