uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;

void main() {
	vec3 pos = position;

	pos.z += sin(pos.x * uFrequency + uTime) * uAmplitude;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}