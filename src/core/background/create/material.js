import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';
import noiseShader from '/src/assets/shaders/utils/noise.glsl?raw';
import vertexShader from '/src/assets/shaders/background/vertex.glsl?raw';
import fragmentShader from '/src/assets/shaders/background/fragment.glsl?raw';

export function createMaterial() {
	const waveFrequency = config.wave.frequency;
	const colorFrequency = config.color.frequency;

	const primary = config.color.primary;
	const primaryColor = primary.color;

	const secondary = config.color.secondary;
	const secondaryColor = secondary.color;

	const grain = config.grain;
	const grainColor = grain.color;

	global.material = new THREE.ShaderMaterial({
		vertexShader: noiseShader + '\n' + vertexShader,
		fragmentShader: noiseShader + '\n' + fragmentShader,
		uniforms: {
			uTime: { value: 0 },
			uFrame: { value: 0 },
			uAmplitude: { value: config.wave.amplitude },
			uWaveFrequency: { value: new THREE.Vector2(waveFrequency.x, waveFrequency.y) },

			uColorFrequency: { value: new THREE.Vector2(colorFrequency.x, colorFrequency.y) },
			uBaseColor: { value: global.backgroundColor },

			uPrimaryColor: { value: new THREE.Color(`rgb(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b})`) },
			uPrimaryMin: { value: primary.min },
			uPrimaryMax: { value: primary.max },

			uSecondaryColor: { value: new THREE.Color(`rgb(${secondaryColor.r}, ${secondaryColor.g}, ${secondaryColor.b})`) },
			uSecondaryMin: { value: secondary.min },
			uSecondaryMax: { value: secondary.max },

			uGrainColor: { value: new THREE.Color(`rgb(${grainColor.r}, ${grainColor.g}, ${grainColor.b})`) },
			uGrainAmount: { value: grain.amount },
			uGrainExponent: { value: grain.exponent },
		},
		wireframe: config.background.wireframe,
		side: THREE.FrontSide,
	});

	let prevTime = performance.now();
	global.animations.material = function (time) {
		const delta = time - prevTime;
		prevTime = time;

		global.material.uniforms.uTime.value += delta / 10000 * config.wave.speed;
		global.material.uniforms.uFrame.value += Math.random() * 1000;
	};

	return global.material;
}