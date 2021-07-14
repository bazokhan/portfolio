import { memo, useEffect, useRef } from "react";
import { AnimatedSprite } from "@inlet/react-pixi";

type AnimatedSpriteProps = {
  animationSpeed?: number;
  isPlaying?: boolean;
  textures?: any[];
  anchor?: number;
};

const AnimationSprite: React.FC<AnimatedSpriteProps> = memo(
  ({ isPlaying, ...props }) => {
    const animationSprite = useRef();

    useEffect(() => {
      const sprite: Record<string, any> = animationSprite?.current;
      const identifier = isPlaying ? "gotoAndPlay" : "gotoAndStop";
      if (sprite?.[identifier]) {
        sprite[identifier](sprite.currentFrame);
      }
    }, [isPlaying]);

    return (
      <AnimatedSprite
        isPlaying={isPlaying}
        scale={2}
        ref={animationSprite}
        {...props}
      />
    );
  }
);

export default AnimationSprite;
