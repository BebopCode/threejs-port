import {Canvas} from "@react-three/fiber";
import { Experience} from "./components/Experience";
import { ScrollControls } from "@react-three/drei";

function App(){
  return(
    <>
    <Canvas >
      <color attach="background" args={["#ececec"]} />
      <ScrollControls pages={15} damping={0.0}>
      <Experience />
      </ScrollControls>
    </Canvas>
    </>
  );
}

export default App
