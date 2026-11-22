import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';
import { createGeometry } from './geometry';
import { createMaterial } from './material';

export function createMesh() {
	const geometry = createGeometry();
	const material = createMaterial();
	const rotation = config.background.rotation;

	global.background = new THREE.Mesh(geometry, material);
	global.scene.add(global.background);

	rotate(rotation);
}

const radians = 1 / 180 * Math.PI;
export function rotate(rotation) {
	global.background.setRotationFromEuler(new THREE.Euler(-rotation.x * radians, rotation.y * radians, 0));
}