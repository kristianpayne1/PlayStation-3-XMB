import { useContext, createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export type Theme =
    | "original"
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december";

export type ControlsContext = {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
    flowSpeed: number;
    setFlowSpeed: Dispatch<SetStateAction<number>>;
    opacity: number;
    setOpacity: Dispatch<SetStateAction<number>>;
    brightness: number;
    setBrightness: Dispatch<SetStateAction<number>>;
    damping: number;
    setDamping: Dispatch<SetStateAction<number>>;
    tension: number;
    setTension: Dispatch<SetStateAction<number>>;
    length: number;
    setLength: Dispatch<SetStateAction<number>>;
    perturbation: number;
    setPerturbation: Dispatch<SetStateAction<number>>;
};

const contextDefaults: ControlsContext = {
    theme: "original",
    setTheme: () => {},
    flowSpeed: 0.4,
    setFlowSpeed: () => {},
    opacity: 0.25,
    setOpacity: () => {},
    brightness: 1,
    setBrightness: () => {},
    damping: 1,
    setDamping: () => {},
    tension: 0.25,
    setTension: () => {},
    length: 1,
    setLength: () => {},
    perturbation: 0,
    setPerturbation: () => {},
};

const context = createContext<ControlsContext | null>(null);

function useControls() {
    const controls = useContext(context);

    if (!controls) {
        throw new Error("useControls must be used within a ControlsProvider");
    }

    return controls;
}

export function ControlsProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(contextDefaults.theme);
    const [flowSpeed, setFlowSpeed] = useState<number>(
        contextDefaults.flowSpeed,
    );
    const [opacity, setOpacity] = useState<number>(contextDefaults.opacity);
    const [brightness, setBrightness] = useState<number>(
        contextDefaults.brightness,
    );
    const [damping, setDamping] = useState<number>(contextDefaults.damping);
    const [tension, setTension] = useState<number>(contextDefaults.tension);
    const [length, setLength] = useState<number>(contextDefaults.length);
    const [perturbation, setPerturbation] = useState<number>(
        contextDefaults.perturbation,
    );

    return (
        <context.Provider
            value={{
                theme,
                setTheme,
                flowSpeed,
                setFlowSpeed,
                opacity,
                setOpacity,
                brightness,
                setBrightness,
                damping,
                setDamping,
                tension,
                setTension,
                length,
                setLength,
                perturbation,
                setPerturbation,
            }}
        >
            {children}
        </context.Provider>
    );
}

export default useControls;
