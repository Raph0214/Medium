import * as THREE from 'three';
import { global } from "../global";
import { createGeometry } from './geometry';
import { createMaterial } from './material';

export function createMesh() {
	const geometry = createGeometry();
	const material = createMaterial();

	global.plane = new THREE.Mesh(geometry, material);
	global.scene.add(global.plane);
}