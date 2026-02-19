import { Button, Flex, Heading, DropdownMenu, Slider } from "@radix-ui/themes";
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
    const float = value % 1 !== 0 || step % 1 !== 0;
    return (
        <Control label={`${label}: ${float ? value.toFixed(2) : value}`}>
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
        resolution,
        setResolution,
        length,
        setLength,
        flowSpeed,
        setFlowSpeed,
        opacity,
        setOpacity,
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
                label="Resolution"
                value={resolution}
                min={1}
                max={256}
                step={1}
                onChange={setResolution}
            />
            <SliderControl
                label="Length"
                value={length}
                min={0}
                max={5}
                step={0.01}
                onChange={setLength}
            />
            <SliderControl
                label="Opacity"
                value={opacity}
                min={0}
                max={1}
                step={0.01}
                onChange={setOpacity}
            />
        </Flex>
    );
}

export default Controls;
