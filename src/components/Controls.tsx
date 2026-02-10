import { Button, Card, Flex, Heading, DropdownMenu } from "@radix-ui/themes";
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

function Controls() {
    const { theme, setTheme } = useControls();

    return (
        <Card>
            <Flex direction="column" gap="5">
                <Heading as="h2" size="4" align="center">
                    Wave Configuration
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
            </Flex>
        </Card>
    );
}

export default Controls;
