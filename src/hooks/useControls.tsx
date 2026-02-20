import { useContext, createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Color } from "three";

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
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
    color: Color;
    setColor: Dispatch<SetStateAction<Color>>;
    resolution: number;
    setResolution: Dispatch<SetStateAction<number>>;
    length: number;
    setLength: Dispatch<SetStateAction<number>>;
    flowSpeed: number;
    setFlowSpeed: Dispatch<SetStateAction<number>>;
    opacity: number;
    setOpacity: Dispatch<SetStateAction<number>>;
};

const contextDefaults: ControlsContext = {
    open: true,
    setOpen: () => {},
    theme: "original",
    setTheme: () => {},
    color: new Color("#fff"),
    setColor: () => {},
    resolution: 128,
    setResolution: () => {},
    length: 1.0,
    setLength: () => {},
    flowSpeed: 1.0,
    setFlowSpeed: () => {},
    opacity: 0.5,
    setOpacity: () => {},
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
    const [open, setOpen] = useState<boolean>(contextDefaults.open);
    const [theme, setTheme] = useState<Theme>(contextDefaults.theme);
    const [color, setColor] = useState<Color>(contextDefaults.color);
    const [resolution, setResolution] = useState<number>(
        contextDefaults.resolution,
    );
    const [length, setLength] = useState<number>(contextDefaults.length);
    const [flowSpeed, setFlowSpeed] = useState<number>(
        contextDefaults.flowSpeed,
    );
    const [opacity, setOpacity] = useState<number>(contextDefaults.opacity);

    return (
        <context.Provider
            value={{
                open,
                setOpen,
                theme,
                setTheme,
                color,
                setColor,
                resolution,
                setResolution,
                length,
                setLength,
                flowSpeed,
                setFlowSpeed,
                opacity,
                setOpacity,
            }}
        >
            {children}
        </context.Provider>
    );
}

export default useControls;
