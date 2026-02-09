import { Canvas } from "@react-three/fiber";
import Wave from "./components/Wave";
import { OrbitControls } from "@react-three/drei";
import RightPanel from "./components/RightPanel";

function App() {
    return (
        <>
            <main className="h-screen">
                <Canvas className="xmb-theme-bg-original">
                    <Wave />
                    <OrbitControls />
                </Canvas>
            </main>
            <RightPanel />
        </>
    );
}

export default App;
