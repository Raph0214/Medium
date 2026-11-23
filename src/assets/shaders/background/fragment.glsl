uniform float uTime;
uniform float uFrame;
uniform vec2 uColorFrequency;
uniform vec3 uBaseColor;

uniform vec3 uPrimaryColor;
uniform float uPrimaryMin;
uniform float uPrimaryMax;

uniform vec3 uSecondaryColor;
uniform float uSecondaryMin;
uniform float uSecondaryMax;
uniform float uEffectAmount;

uniform vec3 uGrainColor;
uniform float uGrainAmount;
uniform float uGrainExponent;

varying vec3 vPosition;

void main() {
	vec3 pos = vPosition;
	vec2 offset = vec2(uTime, 0.0);

	float primary = pow(perlinNoise(pos.xy * uColorFrequency + offset, 2.0) * 0.5 + 0.5, 0.5);
	float primaryFactor = pow(max((primary - uPrimaryMin) / (uPrimaryMax - uPrimaryMin), 0.0), 2.0);
	vec3 primaryColor = uPrimaryColor * primaryFactor;

	float secondary = pow(perlinNoise(pos.xy * uColorFrequency + offset, 3.0) * 0.5 + 0.5, 0.5);
	float secondaryMin = uSecondaryMin + uEffectAmount;
	float secondaryMax = uSecondaryMax + uEffectAmount;
	float secondaryFactor = pow(max((secondary - secondaryMin) / (secondaryMax - secondaryMin), 0.0), 2.0);
	vec3 secondaryColor = uSecondaryColor * secondaryFactor;

	vec3 baseColor = uBaseColor * (1.0 - max(primaryFactor, secondaryFactor));

	float grainFactor = pow(whiteNoise(gl_FragCoord.xy, uFrame), uGrainExponent) * uGrainAmount;
	vec3 grainColor = uGrainColor * grainFactor;

	gl_FragColor = vec4(baseColor + primaryColor + secondaryColor + grainColor, 1.0);

    #include <colorspace_fragment>
}