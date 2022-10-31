import mizuki from "mizuki";
import React from "react";

const useFullpage = (): [
  number,
  (e: React.WheelEvent<HTMLDivElement>) => void
] => {
  const [index, setIndex] = React.useState(0);

  const fullpageConfig = React.useMemo(() => mizuki(), []);

  const { get, set } = React.useMemo(
    // needs useMemo to avoid cleanup on index
    () =>
      fullpageConfig({
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

  const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      set((idx) => idx + 1);
      setIndex(get()); // setState is required to force a rerender
    } else if (e.deltaY < 0) {
      set((idx) => idx - 1);
      setIndex(get());
    }
  };

  return [index, wheelHandler];
};

export default function MyFullpage() {
  const [index, wheelHandler] = useFullpage();

  const offsets = [0, -100, -200, -300];

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
