import { useRef, type ComponentProps } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { DoubleSide, Material } from "three";
import FlowMaterial from "../materials/FlowMaterial";

extend({ FlowMaterial });

type WaveProps = ComponentProps<"mesh"> & {
    resolution?: number;
};

type FlowUniformMaterial = Material & {
    uTime: number;
};

export default function Wave({ resolution = 128, ...meshProps }: WaveProps) {
    const materialRef = useRef<FlowUniformMaterial | null>(null);

    useFrame((_, deltaTime) => {
        const material = materialRef.current;
        if (!material) return;

        material.uTime += deltaTime;
    });

    return (
        <mesh {...meshProps}>
            <planeGeometry args={[2, 2, resolution, resolution]} />
            <flowMaterial
                ref={materialRef}
                side={DoubleSide}
                transparent
                depthTest={false}
            />
        </mesh>
    );
}
