import { useEffect, useState } from "react";
import { Box, Button, DropdownMenu, Flex, TextField } from "@radix-ui/themes";
import { Color } from "three";

type ColorPickerProps = {
    label?: string;
    color: Color;
    onChange: (color: Color) => void;
};

const hexPattern = /^#?[0-9a-fA-F]{6}$/;

const normalizeHex = (value: string) =>
    (value.startsWith("#") ? value : `#${value}`).toLowerCase();

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
    const [hexInput, setHexInput] = useState(`#${color.getHexString()}`);

    useEffect(() => {
        setHexInput(`#${color.getHexString()}`);
    }, [color]);

    const applyHexColor = (value: string) => {
        if (!hexPattern.test(value)) return;
        const normalizedHex = normalizeHex(value);
        setHexInput(normalizedHex);
        onChange(new Color(normalizedHex));
    };

    const handleColorInputBlur = () => {
        if (!hexPattern.test(hexInput)) {
            setHexInput(`#${color.getHexString()}`);
            return;
        }

        setHexInput(normalizeHex(hexInput));
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
                                backgroundColor: `#${color.getHexString()}`,
                            }}
                        />
                        {hexInput}
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
                        value={
                            hexPattern.test(hexInput)
                                ? normalizeHex(hexInput)
                                : `#${color.getHexString()}`
                        }
                        onChange={(event) =>
                            applyHexColor(event.currentTarget.value)
                        }
                    />
                    <TextField.Root
                        value={hexInput}
                        onChange={(event) => {
                            const nextValue = event.currentTarget.value;
                            setHexInput(nextValue);
                            applyHexColor(nextValue);
                        }}
                        onBlur={handleColorInputBlur}
                        placeholder="#ffffff"
                    />
                </Flex>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
