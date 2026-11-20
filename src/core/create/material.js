import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';
import vertexShader from '../../assets/shaders/plane/vertex.glsl?raw';
import fragmentShader from '../../assets/shaders/plane/fragment.glsl?raw';
import noiseShader from '../../assets/shaders/plane/utils/noise.glsl?raw'

let prevTime = 0;
export function createMaterial() {
	if (global.material) {
		global.material.dispose();
		global.animations.material = null;
	}

	const frequency = config.noise.frequency
	global.material = new THREE.ShaderMaterial({
		vertexShader: noiseShader + '\n' + vertexShader,
		fragmentShader,
		uniforms: {
			uTime: { value: 0 },
			uAmplitude: { value: config.noise.amplitude },
			uFrequency: { value: new THREE.Vector2(frequency.x, frequency.y) },
		},
		wireframe: config.backgroundPlane.wireframe,
	});

	global.animations.material = function (time) {
		global.material.uniforms.uTime.value += (time - prevTime) / 10000 * config.noise.speed;

		prevTime = time;
	}

	return global.material;
}