import { Card, Flex, Button } from "@radix-ui/themes";
import Controls from "./Controls";

function RightPanel() {
    return (
        <div className="overflow-scroll absolute right-5 top-5 h-screen w-100">
            <Card>
                <Flex direction="column" gap="5">
                    <Controls />
                    <Button size="3" variant="soft">
                        Hide Interface
                    </Button>
                </Flex>
            </Card>
        </div>
    );
}

export default RightPanel;
