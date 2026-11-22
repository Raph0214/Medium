import * as THREE from 'three';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { global } from '../global';
import { config } from '../config';

export function createText() {
	const element = document.createElement('div');

	element.textContent = 'test';
	element.style.fontSize = '48px';
	element.style.fontFamily = 'Arial';
	element.style.color = 'white';
	//element.style.background = 'white';
	element.style.padding = '20px';
	element.style.whiteSpace = 'nowrap';

	global.test = new CSS3DObject(element);
	global.scene.add(global.test);

	global.animations.text = function (time) {
		const alpha = Math.sin(time / 2000) * 0.5 + 0.5;
		const position = global.start.clone().lerp(global.end, alpha);
		const x = (position.x / global.start.x) ** (config.text.exponent) * global.start.x;

		global.test.position.copy(new THREE.Vector3(x, position.y, position.z));
	}

	updatePosition();
}

export function updatePosition() {
	global.start = position(config.text.start);
	global.end = position(config.text.end);
}

function position(pos) {
	const fov = THREE.MathUtils.degToRad(config.camera.FOV);
	const aspect = window.innerWidth / window.innerHeight;

	const direction = new THREE.Vector3(pos.x * aspect * Math.tan(fov / 2), pos.y * Math.tan(fov / 2), -1).normalize();

	return direction.clone().multiplyScalar(pos.z / -direction.z);
}