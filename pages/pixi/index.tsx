// import { Stage } from "@inlet/react-pixi";
import dynamic from "next/dynamic";

type StageProps = {
  width?: number;
  height?: number;
};

const Stage: React.ComponentType<StageProps> = dynamic(
  () => import("@inlet/react-pixi").then((pixi) => pixi.Stage),
  {
    ssr: false,
  }
);
const JetFighter = dynamic(() => import("../../components/JetFighter"), {
  ssr: false,
});

const [width, height] = [500, 500];

const PixiPage = () => (
  <Stage width={width} height={height}>
    <JetFighter />
  </Stage>
);

export default PixiPage;
