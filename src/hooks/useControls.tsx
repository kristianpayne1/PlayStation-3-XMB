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
};

const contextDefaults: ControlsContext = {
    theme: "original",
    setTheme: () => {},
    flowSpeed: 1.0,
    setFlowSpeed: () => {},
    opacity: 0.5,
    setOpacity: () => {},
    brightness: 1,
    setBrightness: () => {},
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
            }}
        >
            {children}
        </context.Provider>
    );
}

export default useControls;
