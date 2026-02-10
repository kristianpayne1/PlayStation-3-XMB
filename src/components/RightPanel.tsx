import { Heading, Text, Flex, Blockquote, Button } from "@radix-ui/themes";
import Controls from "./Controls";

function Highlight({ children }: { children: React.ReactNode }) {
    return <Blockquote className="flex flex-col">{children}</Blockquote>;
}

function RightPanel() {
    return (
        <div className="absolute right-0 top-0 h-screen w-115 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.4)_20%,rgba(0,0,0,0.7)_100%)] max-[600px]:inset-0 max-[600px]:h-screen max-[600px]:w-screen max-[600px]:bg-none max-[600px]:bg-[rgba(0,0,0,0.7)]">
            <Flex direction="column" gap="5" className="py-15 px-10">
                <Heading>PlayStation 3 XMB Wave System</Heading>
                <Text>
                    A technical recreation of the PlayStation 3 XrossMediaBar
                    wave using WebGL and ThreeJS.
                </Text>
                <Highlight>
                    <b>🎮 Semi-Authentic Experience</b>
                    Recreation using original PlayStation 3 XMB design and
                    visual effects
                </Highlight>
                <Highlight>
                    <b>⚡ WebGL Acceleration</b>
                    GPU-accelerated rendering with adaptive performance
                    optimization
                </Highlight>
                <Highlight>
                    <b>🌊 Dynamic Waves</b>
                    Real-time wave physics with noise functions almost matching
                    the PlayStation 3 XMB behavior
                </Highlight>
                <Controls />
                <Button variant="soft" size="3">
                    Hide Interface
                </Button>
            </Flex>
        </div>
    );
}

export default RightPanel;
