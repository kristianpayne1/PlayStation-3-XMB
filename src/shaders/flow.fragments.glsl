precision mediump float;

uniform float opacity;
uniform float brightness;

varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vNormalView;

void main() {
  vec3 N = normalize(vNormalView);

  vec3 viewDir = normalize(vViewPosition);
  float fresnel = 0.5 * pow(1.0 + dot(viewDir, N), 4.0);
  float alpha = clamp(fresnel * opacity * brightness, 0.0, 1.0);

  gl_FragColor = vec4(vec3(1.0), alpha);
}
