import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';
import vertexShader from '../../assets/shaders/plane/vertex.glsl?raw';
import fragmentShader from '../../assets/shaders/plane/fragment.glsl?raw';

export function createMaterial() {
	if (global.material) {
		global.material.dispose();
		global.animations.material = null;
	}

	global.material = new THREE.ShaderMaterial({
		vertexShader,
		fragmentShader,
		uniforms: {
			uTime: { value: 0 },
			uAmplitude: { value: 1 },
			uFrequency: { value: 1 },
		},
		wireframe: config.backgroundPlane.wireframe,
	});

	global.animations.material = function (time) {
		global.material.uniforms.uTime.value = time / 1000;
	}

	return global.material;
}