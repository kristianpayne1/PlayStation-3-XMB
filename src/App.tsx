import { Canvas } from "@react-three/fiber";
import Wave from "./components/Wave";
import RightPanel from "./components/RightPanel";
import useControls from "./hooks/useControls";
import Camera from "./components/Camera";

function App() {
    const { theme, color, resolution, length, opacity } = useControls();

    return (
        <>
            <main className="h-screen">
                <Canvas className={`xmb-theme-bg-${theme}`}>
                    <Camera />
                    <Wave {...{ color, resolution, length, opacity }} />
                </Canvas>
            </main>
            <RightPanel />
        </>
    );
}

export default App;
