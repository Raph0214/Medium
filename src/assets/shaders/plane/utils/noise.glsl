vec2 randomGradient(vec2 p, float seed) {
	vec2 q = vec2(dot(p, vec2(127.1, 311.7)) + seed * 74.7, dot(p, vec2(269.5, 183.3)) + seed * 113.5);

	return normalize(-1.0 + 2.0 * fract(sin(q) * 43758.5453));
}

float noise(vec2 p, float seed) {
	vec2 i = floor(p);
	vec2 f = fract(p);

	vec2 u = f * f * (3.0 - 2.0 * f);

	vec2 g00 = randomGradient(i, seed);
	vec2 g10 = randomGradient(i + vec2(1.0, 0.0), seed);
	vec2 g01 = randomGradient(i + vec2(0.0, 1.0), seed);
	vec2 g11 = randomGradient(i + vec2(1.0, 1.0), seed);

	float n00 = dot(g00, f - vec2(0.0, 0.0));
	float n10 = dot(g10, f - vec2(1.0, 0.0));
	float n01 = dot(g01, f - vec2(0.0, 1.0));
	float n11 = dot(g11, f - vec2(1.0, 1.0));

	float nx0 = mix(n00, n10, u.x);
	float nx1 = mix(n01, n11, u.x);

	return mix(nx0, nx1, u.y);
}
