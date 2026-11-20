uniform float uTime;
uniform float uAmplitude;
uniform vec2 uFrequency;

void main() {
	vec3 pos = position;
	vec2 offset = vec2(uTime, 0.0);

	pos.z += noise(pos.xy * uFrequency + offset, 0.0) * uAmplitude;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}