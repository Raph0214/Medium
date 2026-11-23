import * as THREE from 'three';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { global as GLOBAL } from '../../global';
import { global } from '../global';
import { config } from '../config';

export function createText() {
	const element = document.createElement('div');

	element.textContent = 'test';
	element.style.fontSize = '48px';
	element.style.color = 'white';

	global.test = new CSS3DObject(element);
	global.scene.add(global.test);

	global.animations.text = function () {
		const start = global.start;
		const end = global.end;

		const alpha = GLOBAL.scroll;
		const position = start.clone().lerp(end, alpha);
		const x = alpha > 1 ? end.x : (position.x / start.x) ** config.text.exponent * start.x;

		global.test.position.set(x, position.y, position.z);
	};

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