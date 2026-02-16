import { shaderMaterial } from "@react-three/drei";
import { type ThreeElement } from "@react-three/fiber";
import type { Material } from "three";

import flowVertexShader from "../shaders/flow.vertex.glsl";
import flowFragmentShader from "../shaders/flow.fragments.glsl";

const defaultFlowUniforms = {
    uTime: 0,
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
