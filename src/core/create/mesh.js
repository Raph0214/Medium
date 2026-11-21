import * as THREE from 'three';
import { global } from "../global";
import { config } from '../config';
import { createGeometry } from './geometry';
import { createMaterial } from './material';

export function createMesh() {
	const geometry = createGeometry();
	const material = createMaterial();
	const rotation = config.backgroundPlane.rotation;

	global.plane = new THREE.Mesh(geometry, material);
	global.scene.add(global.plane);

	rotate(rotation);
}

const radians = 1 / 180 * Math.PI;
export function rotate(rotation) {
	global.plane.setRotationFromEuler(new THREE.Euler(-rotation.x * radians, rotation.y * radians, 0));
}