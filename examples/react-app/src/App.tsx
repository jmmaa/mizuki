import mizuki from "mizuki";
import bezier from "bezier-easing";
import React from "react";

const ease = bezier(0.25, 0.1, 0.25, 1.0);

// custom hooks for mizuki v2

const useTracker = (options: any) => React.useRef(mizuki.createTracker(options)).current;
const useTimeout = () => React.useRef(mizuki.createTimeout()).current;
const useNonReactiveState = <T,>(initState: T) =>
  React.useRef(mizuki.createState(initState)).current;

function MyFullpage() {
  const [allowedToGo] = useTracker({ delay: 1000, min: 0, max: 3 });
  const [timeout, isTimedout] = useTimeout();
  const [getLastUnits, setLastUnits] = useNonReactiveState(0);

  const createWheelHandler = (el: HTMLElement) => {
    return (event: any) => {
      if (isTimedout()) return;

      if (event.deltaY > 0) {
        if (!allowedToGo((index) => index + 1)) return;

        mizuki.createAnimation({ duration: 1000 }, (delta) => {
          const transformValue = getLastUnits() + ease(delta) * -100;
          el.style.transform = `translate3d(0, ${transformValue}vh, 0)`;

          return () => setLastUnits(() => transformValue);
        });

        timeout(1000);
      } else if (event.deltaY < 0) {
        if (!allowedToGo((index) => index - 1)) return;

        mizuki.createAnimation({ duration: 1000 }, (delta) => {
          const transformValue = getLastUnits() + ease(delta) * 100;
          el.style.transform = `translate3d(0, ${transformValue}vh, 0)`;

          return () => setLastUnits(() => transformValue);
        });

        timeout(1000);
      }
    };
  };

  React.useEffect(() => {
    const scroller = document.querySelector(".scroller") as HTMLElement;
    const onWheel = mizuki.createEventObserver(scroller, "wheel");

    let unsub = onWheel(createWheelHandler(scroller));
    return () => unsub();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflowY: "hidden" }}>
      <div className="scroller">
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
