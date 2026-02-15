import {
    Button,
    Card,
    Flex,
    Heading,
    DropdownMenu,
    Slider,
} from "@radix-ui/themes";
import useControls from "../hooks/useControls";
import type { Theme } from "../hooks/useControls";

const themes: Theme[] = [
    "original",
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];

const toTitleCase = (value: string) => value[0].toUpperCase() + value.slice(1);

type ControlProps = React.PropsWithChildren<{
    label: string;
}>;

function Control({ label = "", children }: ControlProps) {
    return (
        <Flex direction="column" gap="2">
            <label>{label}</label>
            {children}
        </Flex>
    );
}

type SliderControlProps = {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
};

function SliderControl({
    label,
    value,
    min,
    max,
    step,
    onChange,
}: SliderControlProps) {
    return (
        <Control label={`${label}: ${value.toFixed(2)}`}>
            <Slider
                min={min}
                max={max}
                step={step}
                value={[value]}
                onValueChange={(nextValue) => onChange(nextValue[0] ?? min)}
            />
        </Control>
    );
}

function Controls() {
    const {
        theme,
        setTheme,
        flowSpeed,
        setFlowSpeed,
        opacity,
        setOpacity,
        brightness,
        setBrightness,
    } = useControls();

    return (
        <Flex direction="column" gap="5">
            <Heading as="h2" size="4" align="center">
                Configuration
            </Heading>
            <Control label="Color Theme">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button
                            variant="soft"
                            style={{ justifyContent: "space-between" }}
                        >
                            {toTitleCase(theme)}
                            <DropdownMenu.TriggerIcon />
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        {themes.map((theme) => (
                            <DropdownMenu.Item
                                key={theme}
                                onClick={() => setTheme(theme)}
                            >
                                {toTitleCase(theme)}
                            </DropdownMenu.Item>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Control>
            <SliderControl
                label="Flow Speed"
                value={flowSpeed}
                min={0}
                max={2}
                step={0.01}
                onChange={setFlowSpeed}
            />
            <SliderControl
                label="Opacity"
                value={opacity}
                min={0}
                max={1}
                step={0.01}
                onChange={setOpacity}
            />
            <SliderControl
                label="Brightness"
                value={brightness}
                min={0}
                max={1}
                step={0.01}
                onChange={setBrightness}
            />
        </Flex>
    );
}

export default Controls;
