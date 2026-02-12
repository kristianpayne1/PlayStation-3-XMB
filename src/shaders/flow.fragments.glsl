precision mediump float;

uniform float opacity;
uniform float brightness;

varying vec3 vViewPosition;
varying vec3 vNormalView;

void main() {
  vec3 N = normalize(vNormalView);
  N = gl_FrontFacing ? N : -N;

  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - abs(dot(viewDir, N)), 2.0);
  float alpha = clamp((0.2 + fresnel) * opacity * brightness, 0.0, 1.0);

  gl_FragColor = vec4(vec3(1.0), alpha);
}
