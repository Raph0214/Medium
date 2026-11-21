uniform float uTime;
uniform vec2 uColorFrequency;
uniform vec3 uBaseColor;

uniform vec3 uPrimaryColor;
uniform float uPrimaryMin;
uniform float uPrimaryMax;

uniform vec3 uSecondaryColor;
uniform float uSecondaryMin;
uniform float uSecondaryMax;

varying vec3 vPosition;

void main() {
	vec3 pos = vPosition;
	vec2 offset = vec2(uTime, 0.0);

	float primary = pow(noise(pos.xy * uColorFrequency + offset, 2.0) * 0.5 + 0.5, 0.5);
	float primaryFactor = pow(max((primary - uPrimaryMin) / (uPrimaryMax - uPrimaryMin), 0.0), 2.0);
	vec3 primaryColor = uPrimaryColor * primaryFactor;

	float secondary = pow(noise(pos.xy * uColorFrequency + offset, 3.0) * 0.5 + 0.5, 0.5);
	float secondaryFactor = pow(max((secondary - uSecondaryMin) / (uSecondaryMax - uSecondaryMin), 0.0), 2.0);
	vec3 secondaryColor = uSecondaryColor * secondaryFactor;

	vec3 baseColor = uBaseColor * (1.0 - max(primaryFactor, secondaryFactor));

	gl_FragColor = vec4(baseColor + primaryColor + secondaryColor, 1.0);

    #include <colorspace_fragment>
}