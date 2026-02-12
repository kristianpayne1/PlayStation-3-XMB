import { shaderMaterial } from "@react-three/drei";
import { type ThreeElement } from "@react-three/fiber";
import type { Material } from "three";

import flowVertexShader from "../shaders/flow.vertex.glsl";
import flowFragmentShader from "../shaders/flow.fragments.glsl";

const defaultFlowUniforms = {
    uTime: 0,
    flowSpeed: 0.4,
    opacity: 0.5,
    brightness: 1.0,
    damping: 1.0,
    tension: 0.25,
    length: 1.0,
    spacing: 407.658,
    perturbation: 0.0,
    ffdScale1: [5.67726, 1.00077, 1.0],
    ffdScale2: [2.82755, 1.27579, 2.88782],
    ffdOffset: [0.0, -0.469999, 0.0],
};

export default shaderMaterial(
    defaultFlowUniforms,
    flowVertexShader,
    flowFragmentShader,
);


declare module "@react-three/fiber" {
    interface ThreeElements {
        flowMaterial: ThreeElement<typeof Material>;
    }
}

export { defaultFlowUniforms };
