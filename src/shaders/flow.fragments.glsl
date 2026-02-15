precision mediump float;

uniform float uTime;
uniform float flowSpeed;
uniform float opacity;
uniform float brightness;

varying vec2 vUv;

const float widthFactor = 1.5;
const vec3 waveTint = vec3(0.92, 0.94, 0.98);

vec3 calcSine(
  vec2 uv,
  float speed,
  float frequency,
  float amplitude,
  float shift,
  float offset,
  vec3 color,
  float width,
  float exponent,
  bool dir
) {
  float angle = (uTime * flowSpeed) * speed * frequency * -1.0 + (shift + uv.x) * 2.0;
  float y = sin(angle) * amplitude + offset;
  float diffY = y - uv.y;
  float dsqr = abs(diffY);

  if (dir && diffY > 0.0) {
    dsqr *= 4.0;
  } else if (!dir && diffY < 0.0) {
    dsqr *= 4.0;
  }

  float scale = pow(smoothstep(width * widthFactor, 0.0, dsqr), exponent);
  return min(color * scale, color);
}

void main() {
  vec2 uv = vUv;
  vec3 color = vec3(0.0);

  color += calcSine(uv, 0.2, 0.20, 0.2, 0.0, 0.5, waveTint * 0.75, 0.1, 15.0, false);
  color += calcSine(uv, 0.4, 0.40, 0.15, 0.0, 0.5, waveTint * 0.7, 0.1, 17.0, false);
  color += calcSine(uv, 0.3, 0.60, 0.15, 0.0, 0.5, waveTint * 0.85, 0.05, 23.0, false);

  color += calcSine(uv, 0.1, 0.26, 0.07, 0.0, 0.3, waveTint * 0.6, 0.1, 17.0, true);
  color += calcSine(uv, 0.3, 0.36, 0.07, 0.0, 0.3, waveTint * 0.6, 0.1, 17.0, true);
  color += calcSine(uv, 0.5, 0.46, 0.07, 0.0, 0.3, waveTint * 0.8, 0.05, 23.0, true);
  color += calcSine(uv, 0.2, 0.58, 0.05, 0.0, 0.3, waveTint * 0.55, 0.2, 15.0, true);

  color *= brightness;
  float waveAlpha = clamp(max(color.r, max(color.g, color.b)), 0.0, 1.0) * opacity;
  gl_FragColor = vec4(color, waveAlpha);
}
