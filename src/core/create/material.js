import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';
import vertexShader from '../../assets/shaders/plane/vertex.glsl?raw';
import fragmentShader from '../../assets/shaders/plane/fragment.glsl?raw';
import noiseShader from '../../assets/shaders/plane/utils/noise.glsl?raw'

let prevTime = 0;
export function createMaterial() {
	const waveFrequency = config.wave.frequency;
	const colorFrequency = config.color.frequency;

	const primary = config.color.primary;
	const primaryColor = primary.color;

	global.material = new THREE.ShaderMaterial({
		vertexShader: noiseShader + '\n' + vertexShader,
		fragmentShader: noiseShader + '\n' + fragmentShader,
		uniforms: {
			uTime: { value: 0 },
			uAmplitude: { value: config.wave.amplitude },
			uWaveFrequency: { value: new THREE.Vector2(waveFrequency.x, waveFrequency.y) },

			uColorFrequency: { value: new THREE.Vector2(colorFrequency.x, colorFrequency.y) },
			uBaseColor: { value: global.backgroundColor },

			uPrimaryColor: { value: new THREE.Color(`rgb(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b})`) },
			uPrimaryMin: { value: primary.min },
			uPrimaryMax: { value: primary.max },
		},
		wireframe: config.backgroundPlane.wireframe,
		side: THREE.FrontSide,
	});

	global.animations.material = function (time) {
		global.material.uniforms.uTime.value += (time - prevTime) / 10000 * config.wave.speed;

		prevTime = time;
	}

	return global.material;
}