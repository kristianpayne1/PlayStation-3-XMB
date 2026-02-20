import { useEffect, useState } from "react";
import { Box, Button, DropdownMenu, Flex, TextField } from "@radix-ui/themes";

type ColorPickerProps = {
    label?: string;
    color: string;
    onChange: (color: string) => void;
};

const hexPattern = /^#?[0-9a-fA-F]{6}$|^#?[0-9a-fA-F]{3}$/;

const normalizeHex = (value: string) =>
    (value.startsWith("#") ? value.toUpperCase() : `#${value}`).toUpperCase();

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
    const [hexColor, setHexColor] = useState(normalizeHex(color));

    useEffect(() => {
        if (!hexPattern.test(normalizeHex(color))) return;
        setHexColor(normalizeHex(color));
    }, [color]);

    const updateHexColor = (value: string) => {
        const newHex = normalizeHex(value);
        setHexColor(newHex);
        if (hexPattern.test(newHex)) onChange(newHex);
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    variant="soft"
                    style={{ justifyContent: "space-between" }}
                >
                    <Flex align="center" gap="2">
                        <Box
                            width="16px"
                            height="16px"
                            style={{
                                borderRadius: "999px",
                                border: "1px solid var(--gray-8)",
                                backgroundColor: hexColor,
                            }}
                        />
                        {hexColor}
                    </Flex>
                    <DropdownMenu.TriggerIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                onCloseAutoFocus={(event) => event.preventDefault()}
            >
                <Flex direction="column" gap="3" p="2">
                    <input
                        type="color"
                        aria-label="Pick a color"
                        className="w-full h-10 border-0 padding-0 bg-transparent cursor-pointer"
                        value={hexColor}
                        onChange={(event) =>
                            updateHexColor(event.currentTarget.value)
                        }
                    />
                    <TextField.Root
                        value={hexColor}
                        onChange={(event) =>
                            updateHexColor(event.currentTarget.value)
                        }
                        placeholder="#ffffff"
                    />
                </Flex>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
