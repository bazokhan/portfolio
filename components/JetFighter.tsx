import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Texture } from "pixi.js";
import { Container, useApp, useTick } from "@inlet/react-pixi";

const [width, height] = [500, 500];
const spritesheet =
  "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";

const AnimationSprite = dynamic(() => import("./AnimationSprite"), {
  ssr: false,
});

const JetFighter: React.FC = () => {
  const [frames, setFrames] = useState([]);
  const [rot, setRot] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const app = useApp();

  useTick((delta) => setRot((r) => r + 0.01 * delta));

  // load
  useEffect(() => {
    app.loader.add(spritesheet).load((_, resource) => {
      setFrames(
        Object.keys(resource[spritesheet].data.frames).map((frame) =>
          Texture.from(frame)
        )
      );
    });
  }, []);

  if (frames.length === 0) {
    return null;
  }

  return (
    <Container
      rotation={rot}
      x={width / 2}
      y={height / 2}
      interactive={true}
      pointerdown={() => setIsPlaying((isPlaying) => !isPlaying)}
    >
      <AnimationSprite
        animationSpeed={0.5}
        isPlaying={isPlaying}
        textures={frames}
        anchor={0.5}
      />
    </Container>
  );
};

export default JetFighter;
