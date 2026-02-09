import { Heading, Text, Flex, Blockquote, Card } from "@radix-ui/themes";

function RightPanel() {
    return (
        <div className="absolute right-0 top-0 h-screen w-115 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.4)_20%,rgba(0,0,0,0.7)_100%)] max-[600px]:inset-0 max-[600px]:h-screen max-[600px]:w-screen max-[600px]:bg-none max-[600px]:bg-[rgba(0,0,0,0.4)]">
            <Flex direction="column" gap="5" className="py-20 px-10">
                <Heading>PlayStation 3 XMB Wave System</Heading>
                <Text>
                    Kind of a technical recreation of the PlayStation 3
                    XrossMediaBar wave rendering engine using WebGL and ThreeJS.
                </Text>
                <Blockquote color="gray" className="flex flex-col">
                    <b>🎮 Semi-Authentic Experience</b>
                    Recreation using original PlayStation 3 XMB design and
                    visual effects
                </Blockquote>
                <Blockquote color="gray">
                    GPU-accelerated rendering with adaptive performance
                    optimization
                </Blockquote>
                <Blockquote color="gray">
                    Real-time wave physics with noise functions almost matching
                    the PlayStation 3 XMB behavior
                </Blockquote>
                <Card></Card>
            </Flex>
        </div>
    );
}

export default RightPanel;
