import { useMemo, useRef, type ComponentProps } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { DoubleSide, Material } from "three";
import FlowMaterial from "../materials/FlowMaterial";

extend({ FlowMaterial });

type WaveProps = ComponentProps<"mesh"> & {
    resolution?: number;
};

export default function Wave({ resolution = 128, ...meshProps }: WaveProps) {
    const materialRef = useRef<Material | null>(null);
    const clampedResolution = useMemo(
        () => Math.max(2, Math.floor(resolution)),
        [resolution],
    );
    const segments = clampedResolution - 1;

    useFrame((_, deltaTime) => {
        const material = materialRef.current as { uTime: number } | null;
        if (!material) return;

        material.uTime += deltaTime;
    });

    return (
        <mesh {...meshProps}>
            <planeGeometry args={[2, 2, segments, segments]} />
            <flowMaterial
                ref={materialRef}
                side={DoubleSide}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
}
