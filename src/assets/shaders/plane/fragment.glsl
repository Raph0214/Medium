uniform float uTime;
uniform vec2 uColorFrequency;
uniform vec3 uBaseColor;

uniform vec3 uPrimaryColor;
uniform float uPrimaryMin;
uniform float uPrimaryMax;

varying vec3 vPosition;

void main() {
	vec3 pos = vPosition;
	vec2 offset = vec2(uTime, 0.0);

	float primary = pow(noise(pos.xy * uColorFrequency + offset, 2.0) * 0.5 + 0.5, 0.5);
	float primaryFactor = max((primary - uPrimaryMin) / (uPrimaryMax - uPrimaryMin), 0.0);
	vec3 primaryColor = mix(uBaseColor, uPrimaryColor, pow(primaryFactor, 3.0));

	gl_FragColor = vec4(primaryColor, 1.0);

    #include <colorspace_fragment>
}