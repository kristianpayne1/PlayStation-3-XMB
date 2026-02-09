import { useMemo, type ComponentProps } from "react";
import { DoubleSide } from "three";

type WaveProps = ComponentProps<"mesh"> & {
    resolution?: number;
};

export default function Wave({ resolution = 128, ...meshProps }: WaveProps) {
    const clampedResolution = useMemo(
        () => Math.max(2, Math.floor(resolution)),
        [resolution],
    );
    const segments = clampedResolution - 1;

    return (
        <mesh {...meshProps}>
            <planeGeometry args={[2, 2, segments, segments]} />
            <meshBasicMaterial color="#ffffff" wireframe side={DoubleSide} />
        </mesh>
    );
}
