import mizuki from "mizuki";
import bezier from "bezier-easing";
import React from "react";

const ease = bezier(0.25, 0.1, 0.25, 1.0);

// custom hooks for mizuki
const useAnimate = () => React.useRef(mizuki.createAnimation()).current;
const useAction = (options: any) => React.useRef(mizuki.createAction(options)).current;

function MyFullpage() {
  const indexRef = React.useRef(0);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const setter = useAction({ delay: 1000, min: 0, max: 3 });
  const animate = useAnimate();

  const wheelHandler = (event: any) => {
    if (event.deltaY > 0) {
      const newIndex = setter(indexRef.current + 1);

      if (newIndex === undefined) return;
      indexRef.current = newIndex;

      animate((delta, units) => {
        if (scrollerRef.current === null) return;
        let transitionUnits = units + ease(delta) * -100;
        scrollerRef.current.style.transform = `translate3d(0, ${transitionUnits}vh, 0)`;

        return () => transitionUnits;
      }, 1000);
    } else if (event.deltaY < 0) {
      const newIndex = setter(indexRef.current - 1);

      if (newIndex === undefined) return;
      indexRef.current = newIndex;

      animate((delta, units) => {
        if (scrollerRef.current === null) return;
        let transitionUnits = units + ease(delta) * 100;
        scrollerRef.current.style.transform = `translate3d(0, ${transitionUnits}vh, 0)`;

        return () => transitionUnits;
      }, 1000);
    }
  };

  React.useEffect(() => {
    if (scrollerRef.current === null) return;

    scrollerRef.current.addEventListener("wheel", wheelHandler);

    return () => scrollerRef.current?.removeEventListener("wheel", wheelHandler);
  });

  return (
    <div style={{ width: "100vw", height: "100vh", overflowY: "hidden" }}>
      <div className="scroller" ref={scrollerRef}>
        <div style={{ width: "100vw", height: "100vh", background: "#ff5f45" }}>Kanade</div>
        <div style={{ width: "100vw", height: "100vh", background: "#0798ec" }}>Mafuyu</div>
        <div style={{ width: "100vw", height: "100vh", background: "#fc6c7c" }}>Ena</div>
        <div style={{ width: "100vw", height: "100vh", background: "#fec401" }}>Mizuki</div>
      </div>
    </div>
  );
}

export default function App() {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  return (
    <div onClick={() => forceUpdate()}>
      <MyFullpage />
    </div>
  );
}
