import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';

export function createGeometry() {
	if (global.geometry) {
		global.geometry.dispose();
	}

	const size = config.backgroundPlane.size;
	const resolution = config.backgroundPlane.resolution;

	global.geometry = new THREE.PlaneGeometry(size.x, size.y, Math.round(resolution * size.x), Math.round(resolution * size.y));

	if (global.plane) {
		global.plane.geometry = global.geometry;
	}

	return global.geometry;
}