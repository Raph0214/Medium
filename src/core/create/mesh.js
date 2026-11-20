import * as THREE from 'three';
import { global } from "../global";
import { config } from '../config';
import { createGeometry } from './geometry';
import { createMaterial } from './material';

const radians = 1 / 180 * Math.PI;
export function createMesh() {
	if (global.plane) {
		global.scene.remove(global.plane);
	}

	const geometry = createGeometry();
	const material = createMaterial();
	const rotation = config.backgroundPlane.rotation;

	global.plane = new THREE.Mesh(geometry, material);
	global.plane.setRotationFromEuler(new THREE.Euler(rotation.x * radians, -rotation.y * radians, 0))
	global.scene.add(global.plane);
}