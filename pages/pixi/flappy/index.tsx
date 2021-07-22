import dynamic from "next/dynamic";

// type StageProps = {
//   width?: number;
//   height?: number;
// };

const Flappy = dynamic(
  () => import("../../../components/Flappy").then((mod) => mod),
  {
    ssr: false,
  }
);

// const Stage: React.ComponentType<StageProps> = dynamic(
//   () => import("@inlet/react-pixi").then((pixi) => pixi.Stage),
//   {
//     ssr: false,
//   }
// );

// const useApp = dynamic(
//   () =>
//     import("@inlet/react-pixi")
//       .then((pixi) => console.log(pixi) || pixi.useApp)
//       .then((props) => console.log(props) || props),
//   {
//     ssr: false,
//   }
// );

const FlappyPage = () => {
  // const app = useApp();
  return (
    <div>
      <Flappy />
    </div>
  );
};

export default FlappyPage;
