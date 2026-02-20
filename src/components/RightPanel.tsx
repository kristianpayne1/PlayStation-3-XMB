import { Card, Flex, Button, Separator } from "@radix-ui/themes";
import Controls from "./Controls";
import useControls from "../hooks/useControls";

function RightPanel() {
    const { open, setOpen } = useControls();

    return (
        <div className={`overflow-scroll absolute right-5 top-5 w-100 `}>
            <Card>
                <Flex direction="column" gap="5">
                    {open && <Controls />}
                    <Flex direction="column" gap="3">
                        {open && <Separator size="4" />}
                        <Button
                            size="3"
                            variant="soft"
                            onClick={() => setOpen((state) => !state)}
                        >
                            {`${open ? "Hide" : "Show"} Controls`}
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </div>
    );
}

export default RightPanel;
