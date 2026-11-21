uvec2 hash(vec2 p, float seed) {
	uvec2 q = uvec2(ivec2(p));

	uint s = uint(seed);

	q += uvec2(s * 374761393u, s * 668265263u);

	q = q * 1664525u + 1013904223u;
	q.x += q.y * 374761393u;
	q.y += q.x * 668265263u;

	q ^= q >> 16u;
	q *= 2246822519u;
	q ^= q >> 13u;

	return q;
}

float whiteNoise(vec2 p, float seed) {
	return float(hash(p, seed).x) / 4294967295.0;
}

vec2 randomGradient(vec2 p, float seed) {
	vec2 random = vec2(hash(p, seed)) / 4294967295.0;

	float angle = random.x * 6.2831853;

	return vec2(cos(angle), sin(angle));
}

float perlinNoise(vec2 p, float seed) {
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
