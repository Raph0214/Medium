import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';

export function createMaterial() {
	global.material = new THREE.MeshBasicMaterial({ color: 0x7f7f7f });

	return global.material;
}