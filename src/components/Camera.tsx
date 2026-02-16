import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";

const CAMERA_ZOOM = 2;

export default function Camera() {
    const { size } = useThree();

    const aspect = useMemo(() => size.width / size.height || 1, [size]);

    return (
        <OrthographicCamera
            makeDefault
            left={-CAMERA_ZOOM * aspect}
            right={CAMERA_ZOOM * aspect}
            top={CAMERA_ZOOM}
            bottom={-CAMERA_ZOOM}
            near={-100}
            far={1000}
            zoom={1}
            position={[0, 0, 2]}
        />
    );
}
