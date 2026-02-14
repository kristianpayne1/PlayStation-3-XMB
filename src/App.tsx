import { Canvas } from "@react-three/fiber";
import Wave from "./components/Wave";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import RightPanel from "./components/RightPanel";
import useControls from "./hooks/useControls";

function App() {
    const { theme } = useControls();

    return (
        <>
            <main className="h-screen">
                <Canvas className={`xmb-theme-bg-${theme}`}>
                    <Wave />
                    <OrbitControls />
                </Canvas>
            </main>
            <RightPanel />
        </>
    );
}

export default App;
