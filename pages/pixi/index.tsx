// import { Stage } from "@inlet/react-pixi";
import dynamic from "next/dynamic";

type StageProps = {
  width?: number;
  height?: number;
};

// Dynamic import because the react-pixi library is not compatible with SSR
// Then is used to extract the variable we need which is Stage
// srr: false option must be specified, there's a loading option, but it always gave me errors
const Stage: React.ComponentType<StageProps> = dynamic(
  () => import("@inlet/react-pixi").then((pixi) => pixi.Stage),
  {
    ssr: false,
  }
);
const JetFighter = dynamic(() => import("../../components/JetFighter"), {
  ssr: false,
});

const [width, height] = [1000, 500];

const PixiPage = () => (
  <div>
    <Stage width={width} height={height}>
      <JetFighter />
    </Stage>
  </div>
);

export default PixiPage;
