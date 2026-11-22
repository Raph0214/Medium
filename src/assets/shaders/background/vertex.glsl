uniform float uTime;
uniform float uAmplitude;
uniform vec2 uWaveFrequency;
varying vec3 vPosition;

void main() {
	vec3 pos = position;
	vPosition = pos;

	float layer1 = perlinNoise(pos.xy * uWaveFrequency + vec2(uTime, 0.0), 0.0) * uAmplitude;
	float layer2 = perlinNoise(pos.xy * uWaveFrequency + vec2(uTime * 0.5, 0.0), 1.0) * uAmplitude;

	pos.z += layer1 * 0.5 + layer2 * 0.5;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}