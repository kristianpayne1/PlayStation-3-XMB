import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrthographicCamera } from "three";

const CAMERA_ZOOM = 2;

export default function WaveCamera() {
    const { camera, size } = useThree();

    useLayoutEffect(() => {
        if (!(camera instanceof OrthographicCamera)) return;

        const aspect = size.width / size.height;

        camera.left = -CAMERA_ZOOM * aspect;
        camera.right = CAMERA_ZOOM * aspect;
        camera.top = CAMERA_ZOOM;
        camera.bottom = -CAMERA_ZOOM;
        camera.near = -100;
        camera.far = 1000;
        camera.zoom = 1;
        camera.position.set(0, 0, 2);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    }, [camera, size.height, size.width]);

    return null;
}
