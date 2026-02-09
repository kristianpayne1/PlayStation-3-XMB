import { Canvas } from "@react-three/fiber";
import Wave from "./components/Wave";
import { OrbitControls } from "@react-three/drei";

function App() {
    return <Canvas>
        <Wave />
        <OrbitControls />
    </Canvas>;
}

export default App;
