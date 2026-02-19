import { useRef, type ComponentProps } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { DoubleSide, Material } from "three";
import FlowMaterial from "../materials/FlowMaterial";

extend({ FlowMaterial });

type WaveProps = ComponentProps<"mesh"> & {
    resolution?: number;
    opacity?: number;
    length?: number;
};

type FlowUniformMaterial = Material & {
    uTime: number;
    uAlpha: number;
};

export default function Wave({
    resolution = 128,
    opacity = 0.5,
    length = 1,
    ...meshProps
}: WaveProps) {
    const materialRef = useRef<FlowUniformMaterial | null>(null);

    useFrame((_, deltaTime) => {
        const material = materialRef.current;
        if (!material) return;

        material.uTime += deltaTime;
    });

    return (
        <mesh {...meshProps} scale={[length, 1, 1]}>
            <planeGeometry args={[2, 2, resolution, resolution]} />
            <flowMaterial
                ref={materialRef}
                side={DoubleSide}
                transparent
                depthTest={false}
                uAlpha={opacity}
            />
        </mesh>
    );
}
