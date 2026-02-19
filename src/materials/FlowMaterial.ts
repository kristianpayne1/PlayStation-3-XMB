import { shaderMaterial } from "@react-three/drei";
import { type ThreeElement } from "@react-three/fiber";

import flowVertexShader from "../shaders/flow.vertex.glsl";
import flowFragmentShader from "../shaders/flow.fragments.glsl";

const defaultFlowUniforms = {
    uTime: 0,
    uAlpha: 0.5,
};

const FlowMaterial = shaderMaterial(
    defaultFlowUniforms,
    flowVertexShader,
    flowFragmentShader,
);

export default FlowMaterial;

declare module "@react-three/fiber" {
    interface ThreeElements {
        flowMaterial: ThreeElement<typeof FlowMaterial>;
    }
}

export { defaultFlowUniforms };
