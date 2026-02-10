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
};

const contextDefaults: ControlsContext = {
    theme: "original",
    setTheme: () => {},
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

    return (
        <context.Provider value={{ theme, setTheme }}>
            {children}
        </context.Provider>
    );
}

export default useControls;
