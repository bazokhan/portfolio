import React, { useEffect, useRef, useState } from "react";
import clamp from "lodash.clamp";
import { useSprings, animated } from "react-spring";
import { useDrag, useGesture } from "react-use-gesture";
// import "./styles.css";

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

const Viewpager = () => {
  const index = useRef(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const [props, api] = useSprings(
    pages.length,
    (i) => ({
      x: i * windowWidth,
      sc: 1,
      display: i === index.current ? "block" : "none",
    }),
    []
  );
  const bind = useDrag(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      if (distance > window.innerWidth / 2) {
        cancel();
        api.stop();
        index.current = clamp(index.current + -1 * xDir, 0, pages.length - 1);
        // api.set({
        //   x: 0,
        //   sc: 1,
        //   display: "block",
        // });
      }

      api.start((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
        const sc = down ? 1 - distance / window.innerWidth / 2 : 1;

        return { x, sc, display: "block" };
      });
    },
    { axis: "x" }
  );
  return (
    <div className="fixed w-screen h-screen border border-red-600 overflow-hidden cursor-pointer">
      {props.map(({ x, display, sc }, i) => (
        <animated.div
          {...bind()}
          className="absolute w-screen h-screen"
          key={i}
          style={{
            display,
            transform: x.to((x) => `translate3d(${x}px,0,0)`),
          }}
        >
          <animated.div
            className="w-full h-full bg-cover bg-no-repeat bg-center shadow-[0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)]"
            style={{
              transform: sc.to((s) => `scale(${s})`),
              backgroundImage: `url(${pages[i]})`,
            }}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default Viewpager;
