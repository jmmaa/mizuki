import mizuki from "mizuki";
import bezier from "bezier-easing";
import React from "react";

const ease = bezier(0.25, 0.1, 0.25, 1.0);

const useSignal = <T,>(init: T) => React.useRef(mizuki.createSignal<T>(init)).current;

const useTimeout = () => React.useRef(mizuki.createTimeout()).current;

const useFullpage = () => {
  const [index, setIndex] = useSignal(0);
  const [timeout, timedout] = useTimeout();

  React.useEffect(() => {}, []);
};

function MyFullpage() {
  const [timeout, timedout] = useTimeout();
  const [index, setIndex] = useSignal(0);

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
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0); // check if resets

  return (
    <div onClick={() => forceUpdate()}>
      <MyFullpage />
    </div>
  );
}
