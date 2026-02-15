import { useMemo, useRef, type ComponentProps } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide, Material } from "three";
import FlowMaterial from "../materials/FlowMaterial";
import useControls from "../hooks/useControls";

extend({ FlowMaterial });

type WaveProps = ComponentProps<"mesh"> & {
    resolution?: number;
};

type FlowUniformMaterial = Material & {
    uTime: number;
    flowSpeed: number;
    opacity: number;
    brightness: number;
};

export default function Wave({ ...meshProps }: WaveProps) {
    const materialRef = useRef<FlowUniformMaterial | null>(null);
    const { flowSpeed, opacity, brightness } = useControls();

    useFrame((_, deltaTime) => {
        const material = materialRef.current;
        if (!material) return;

        material.uTime += deltaTime;
        material.flowSpeed = flowSpeed;
        material.opacity = opacity;
        material.brightness = brightness;
    });

    return (
        <mesh {...meshProps}>
            <planeGeometry args={[8, 2]} />
            <flowMaterial
                ref={materialRef}
                side={DoubleSide}
                transparent
                blending={AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}
