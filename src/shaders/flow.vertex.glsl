precision highp float;

uniform float uTime;
uniform float flowSpeed;
uniform float damping;
uniform float tension;
uniform float length;
uniform float spacing;
uniform float perturbation;
uniform vec3 ffdScale1;
uniform vec3 ffdScale2;
uniform vec3 ffdOffset;

varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vNormalView;

float hash(float n) {
  return fract(sin(n) * 1e4);
}

float hash(vec2 p) {
  return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
}

float noise(vec2 x) {
  vec2 i = floor(x);
  vec2 f = fract(x);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float noise(vec3 x) {
  const vec3 step = vec3(110.0, 241.0, 171.0);
  vec3 i = floor(x);
  vec3 f = fract(x);
  float n = dot(i, step);
  vec3 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(
      mix(hash(n + dot(step, vec3(0.0, 0.0, 0.0))), hash(n + dot(step, vec3(1.0, 0.0, 0.0))), u.x),
      mix(hash(n + dot(step, vec3(0.0, 1.0, 0.0))), hash(n + dot(step, vec3(1.0, 1.0, 0.0))), u.x),
      u.y
    ),
    mix(
      mix(hash(n + dot(step, vec3(0.0, 0.0, 1.0))), hash(n + dot(step, vec3(1.0, 0.0, 1.0))), u.x),
      mix(hash(n + dot(step, vec3(0.0, 1.0, 1.0))), hash(n + dot(step, vec3(1.0, 1.0, 1.0))), u.x),
      u.y
    ),
    u.z
  );
}

float xmbNoise(vec3 x) {
  return cos(x.z * 4.0) * cos(x.z + uTime / 10.0 + x.x);
}

vec3 evalFlow(vec2 planePos) {
  vec3 p = vec3(planePos.x, 0.0, planePos.y);

  p.y = xmbNoise(p) / 8.0;

  vec3 ffd1 = p * ffdScale1 + ffdOffset;
  vec3 ffd2 = p * ffdScale2 + ffdOffset;

  p.y += sin(ffd1.x + uTime * flowSpeed) * 0.1;
  p.z += cos(ffd2.z + uTime * flowSpeed) * 0.1;

  vec3 p2 = p;
  p2.x = (p2.x - uTime * flowSpeed) / 4.0;
  p2.y -= uTime / 100.0;
  p2.z -= uTime / 10.0;

  float waveHeight = noise(p2 * 8.0) / 12.0 + cos(p.x * 2.0 - uTime / 2.0) / 5.0 - 0.1;
  waveHeight *= (1.0 - clamp(damping, 0.0, 1.0));
  waveHeight += tension * sin(p.x * length + uTime * flowSpeed) + perturbation * noise(p2 * spacing);

  p.y -= waveHeight;
  p.z -= noise(p2 * 8.0) / 12.0;
  return p;
}

void main() {
  vec3 p = evalFlow(position.xy);

  float eps = 0.01;
  vec3 px = evalFlow(position.xy + vec2(eps, 0.0));
  vec3 pz = evalFlow(position.xy + vec2(0.0, eps));
  vec3 nObj = normalize(cross(pz - p, px - p));

  vec4 worldPosition = modelMatrix * vec4(p, 1.0);
  vec4 mvPosition = viewMatrix * worldPosition;

  vUv = uv;
  vViewPosition = -mvPosition.xyz;
  vNormalView = normalize(normalMatrix * nObj);

  gl_Position = projectionMatrix * mvPosition;
}
