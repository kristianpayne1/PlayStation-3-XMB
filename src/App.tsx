import { Canvas } from "@react-three/fiber";
import Wave from "./components/Wave";
import RightPanel from "./components/RightPanel";
import WaveCamera from "./components/WaveCamera";
import useControls from "./hooks/useControls";

function App() {
    const { theme } = useControls();

    return (
        <>
            <main className="h-screen">
                <Canvas
                    orthographic
                    className={`xmb-theme-bg-${theme}`}
                    camera={{ position: [0, 0, 2], near: -100, far: 1000 }}
                >
                    <WaveCamera />
                    <Wave />
                </Canvas>
            </main>
            <RightPanel />
        </>
    );
}

export default App;
