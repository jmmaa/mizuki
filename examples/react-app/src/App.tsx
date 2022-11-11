import mizuki from "mizuki";
import bezier from "bezier-easing";
import React from "react";

const ease = bezier(0.25, 0.1, 0.25, 1.0);

export default function MyFullpage() {
  // FIX THIS

  let index = 0;
  let lastVal = 0;
  let lastTransformVal = 0;

  const set = React.useMemo(() => mizuki.action({ delay: 500 }), []);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const wheelHandler = (event: React.WheelEvent) => {
    if (event.deltaY > 0) {
      const newIndex = set(index + 1);

      if (newIndex === undefined) return;
      index = newIndex;

      mizuki.createAnimationFrames((delta) => {
        let transformValue = lastVal - ease(delta) * 100;
        if (scrollerRef.current === null) return;
        scrollerRef.current.style.transform = `translate3d(0, ${transformValue}vh, 0)`;
        lastTransformVal = transformValue;
      }, 1000);
    } else if (event.deltaY < 0) {
      const newIndex = set(index - 1);

      if (newIndex === undefined) return;
      index = newIndex;

      mizuki.createAnimationFrames((delta) => {
        let transformValue = lastVal + ease(delta) * 100;
        if (scrollerRef.current === null) return;
        scrollerRef.current.style.transform = `translate3d(0, ${transformValue}vh, 0)`;
        lastTransformVal = transformValue;
      }, 1000);
    }
    lastVal = lastTransformVal;
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflowY: "hidden" }}>
      <div ref={scrollerRef} onWheel={wheelHandler}>
        <div style={{ width: "100vw", height: "100vh", background: "#ff5f45" }}>Kanade</div>
        <div style={{ width: "100vw", height: "100vh", background: "#0798ec" }}>Mafuyu</div>
        <div style={{ width: "100vw", height: "100vh", background: "#fc6c7c" }}>Ena</div>
        <div style={{ width: "100vw", height: "100vh", background: "#fec401" }}>Mizuki</div>
      </div>
    </div>
  );
}
