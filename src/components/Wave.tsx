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
    damping: number;
    tension: number;
    length: number;
    perturbation: number;
};

export default function Wave({ resolution = 128, ...meshProps }: WaveProps) {
    const materialRef = useRef<FlowUniformMaterial | null>(null);
    const {
        flowSpeed,
        opacity,
        brightness,
        damping,
        tension,
        length,
        perturbation,
    } = useControls();
    const clampedResolution = useMemo(
        () => Math.max(2, Math.floor(resolution)),
        [resolution],
    );
    const segments = clampedResolution - 1;

    useFrame((_, deltaTime) => {
        const material = materialRef.current;
        if (!material) return;

        material.uTime += deltaTime;
        material.flowSpeed = flowSpeed;
        material.opacity = opacity;
        material.brightness = brightness;
        material.damping = damping;
        material.tension = tension;
        material.length = length;
        material.perturbation = perturbation;
    });

    return (
        <mesh {...meshProps}>
            <planeGeometry args={[8, 2, segments, segments]} />
            <flowMaterial
                ref={materialRef}
                side={DoubleSide}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
}
