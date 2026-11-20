import * as THREE from 'three';
import { config } from '../config';

export function createGeometry() {
	const size = config.backgroundPlane.size;
	const resolution = config.backgroundPlane.resolution;

	const geometry = new THREE.PlaneGeometry(size, size, resolution, resolution);

	return geometry;
}