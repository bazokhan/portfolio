import {
  Stage,
  useApp,
  Container,
  Graphics,
  Text,
  Sprite,
  AnimatedSprite,
  useTick,
} from "@inlet/react-pixi";
import {
  BaseTexture,
  DisplayObject,
  SCALE_MODES,
  settings,
  Sprite as SpriteType,
  //   Sprite,
  Spritesheet,
  Text as TextType,
  TextStyle,
  Texture,
} from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import create from "zustand";

/**
 * https://codepen.io/collection/XPpGdb?grid_type=list
 * Pixi.js event handlers for components:
    pointerdown,
    pointerup,
    pointerupoutside,
    pointermove,
 */

settings.SCALE_MODE = SCALE_MODES.NEAREST;

type DragStore = {
  dragTarget: DisplayObject;
  setDragTarget: (dragTarget: DisplayObject) => void;
};

type CharacterStore = {
  point?: { x: number; y: number };
  setPoint?: ({ x, y }: { x: number; y: number }) => void;
};

const useDragStore = create<DragStore>((set, get) => ({
  dragTarget: null,
  setDragTarget: (dragTarget) => {
    set({ dragTarget });
  },
}));

const createCharacterStore = (initialPosition) => {
  const getStore = create<CharacterStore>((set, get) => ({
    point: initialPosition,
    setPoint: (point) => {
      set({ point });
    },
  }));
  return getStore;
};

const useCharacterStore1 = createCharacterStore({ x: 200, y: 200 });
const useCharacterStore2 = createCharacterStore({ x: 400, y: 400 });

const FlappyGame = () => {
  const app = useApp();

  useEffect(() => {
    app.stage.interactive = true;
  }, [app.stage]);
  //   const [texture, setTexture] = useState(null);
  //   const [textures, setTextures] = useState([]);
  const dragTarget = useDragStore((state) => state.dragTarget);
  const setDragTarget = useDragStore((state) => state.setDragTarget);

  //   const [dragTarget, setDragTarget]: [DisplayObject, any] = useState(null);

  //   useEffect(() => {
  //     if (app?.loader && !app.loader.resources.spritesheet) {
  //       app.loader
  //         .add("spritesheet", "/images/spritesheet.png")
  //         .load((loader, resource) => {
  //           setTexture(app.loader.resources.spritesheet?.texture);
  //         });
  //     }
  //   }, [app.loader]);

  //   useEffect(() => {
  //     if (texture) {
  //       const spritesheet = new Sprite(texture);
  //       console.log(spritesheet?.textures);
  //       setTextures(spritesheet?.textures || []);
  //     }
  //   }, [texture]);

  const drawFlappy = useCallback((g) => {
    g.beginFill(0xff3300)
      .lineStyle(2, 0x123456, 1)
      .drawRect(50, 150, 120, 120)
      .endFill();
  }, []);

  //   const [point, setPoint] = useState({ x: 200, y: 200 });

  const textRef = useRef<TextType>();

  //   useTick(
  //     useCallback(
  //       (delta) => (app.stage.children[1].position.x += 0.1 * delta),
  //       [app.stage.children]
  //     )
  //   );

  const character1 = useRef<SpriteType>();
  const character2 = useRef<SpriteType>();

  useEffect(() => {
    if (character1?.current) {
      character1.current.parent.toLocal(
        { x: 200, y: 200 },
        null,
        character1.current.position
      );
    }
    if (character2?.current) {
      character2.current.parent.toLocal(
        { x: 400, y: 400 },
        null,
        character2.current.position
      );
    }
  }, []);

  useEffect(() => {
    const onDrag = (event) => {
      if (dragTarget) {
        dragTarget.parent.toLocal(event.data.global, null, dragTarget.position);
      }
    };
    app.stage.addListener("pointermove", onDrag);
    return () => {
      app.stage.removeListener("pointermove", onDrag);
    };
  }, [app.stage, dragTarget]);

  return (
    <>
      {/* <Graphics draw={drawFlappy} /> */}
      <Container>
        <Sprite
          ref={character1}
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
          scale={4}
          anchor={0.5}
          interactive
          buttonMode
          //   click={(e) => {
          //     setPoint(e.data.global);
          //     console.log("BOOM");
          //     setDragTarget(e.target);
          //   }}
          pointerdown={(e) => {
            if (e.target) {
              setDragTarget(e.target);
            }
          }}
          pointerup={(e) => {
            setDragTarget(null);
          }}
          pointerupoutside={(e) => {
            setDragTarget(null);
          }}
        />
        <Sprite
          ref={character2}
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
          scale={4}
          anchor={0.5}
          interactive
          buttonMode
          //   click={(e) => {
          //     setPoint(e.data.global);
          //     console.log("BOOM");
          //     setDragTarget(e.target);
          //   }}
          pointerdown={(e) => {
            if (e.target) {
              setDragTarget(e.target);
            }
          }}
          pointerup={(e) => {
            setDragTarget(null);
          }}
          pointerupoutside={(e) => {
            setDragTarget(null);
          }}
        />
      </Container>
      {/* <Text
        ref={textRef}
        text="Hello Pixi"
        x={100}
        y={300}
        interactive
        buttonMode
        pointerdown={(e) => {
          console.log(e);
          console.log(e.data.global);
          if (textRef.current) {
            textRef.current.position.x += 4;
          }
          //   app.stage.children[1].position.x -= 4;
          console.log(textRef);
        }}
        pointerup={(e) => {
          app.stage.children[1].position.x -= 4;
        }}
        style={
          new TextStyle({
            fill: [0xff3300, 0xffffff],
            fontSize: 100,
            stroke: 0x01d27e,
            strokeThickness: 5,
            letterSpacing: 10,
            dropShadow: true,
            dropShadowColor: 0xccced2,
            dropShadowBlur: 10,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 10,
          })
        }
        isSprite
      /> */}
    </>
  );
};

const FlappyWrapper = () => (
  <Stage
    width={window.innerWidth}
    height={window.innerHeight}
    options={{ backgroundColor: 0x000000, antialias: true }}
  >
    <FlappyGame />
  </Stage>
);

export default FlappyWrapper;
