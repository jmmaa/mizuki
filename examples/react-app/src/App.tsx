import mizuki from "mizuki";
import React from "react";

const useEngine = (): [number, () => void, () => void] => {
  const [index, setIndex] = React.useState(0);

  const constructor = React.useMemo(() => mizuki(), []);

  const { get, set } = React.useMemo(
    // needs useMemo to avoid cleanup on index
    () =>
      constructor({
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

  return [
    index,
    () => {
      set((idx) => idx + 1);
      setIndex(get());
    },
    () => {
      set((idx) => idx - 1);
      setIndex(get());
    },
  ];
};

export default function Scroller() {
  const [index, next, prev] = useEngine();

  const offsets = [0, -100, -200, -300];

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
