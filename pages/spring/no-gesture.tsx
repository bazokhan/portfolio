import { useState } from "react";
import { animated, config, to, useSpring } from "react-spring";
import clamp from "lodash.clamp";

const SpringPage = () => {
  const [reverse, setReverse] = useState(false);
  const [configKey, setConfigKey] = useState("wobbly");
  const styles = useSpring({
    to: { counter: 1000, x: 255, scale: 2 },
    from: { counter: 0, x: 0, scale: 1 },
    reset: true,
    reverse,
    delay: 200,
    config: config[configKey],
    onRest: () => setReverse(!reverse),
  });
  console.log(styles);
  return (
    <div className="w-screen h-screen overflow-hidden border-2 border-green-800 bg-black relative">
      <div className="absolute right-0 top-0 flex flex-col">
        {["wobbly", "molasses", "stiff", "default", "slow", "gentle"].map(
          (k) => (
            <button
              key={k}
              onClick={() => setConfigKey(k)}
              className={`${
                configKey === k ? "bg-blue-500" : "bg-blue-800"
              } p-4 text-white`}
            >
              {k}
            </button>
          )
        )}
      </div>
      <animated.div className="w-[400px] h-[400px] bg-red-300 p-10 flex justify-center items-center font-black text-2xl">
        <animated.p
          style={{
            // transform: to([styles.scale], (sc) => `scale(${sc})`),
            scale: styles.scale,
            transformOrigin: "center center",
          }}
        >
          {styles.counter.to((c) => c.toFixed(2))}
        </animated.p>
      </animated.div>
      <animated.div
        style={{
          background: styles.x.to((x) => `rgba(123, ${x}, ${x}, 1)`),
          x: styles.x.to((x) =>
            clamp(x * 3 + 200, 0, process.browser ? window.innerWidth : 0)
          ),
        }}
        className="absolute w-[200px] h-[200px]"
      ></animated.div>
    </div>
  );
};

export default SpringPage;
