import * as THREE from 'three';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { global as GLOBAL } from '../../global';
import { global } from '../global';
import { config } from '../config';
import { content as contentList } from '/src/assets/content';

export function createText() {
	loadContent();

	updatePosition();
}

function loadContent() {
	const template = document.querySelector('#content');

	for (const [index, content] of contentList.entries()) {
		const element = template.content.firstElementChild.cloneNode(true);
		element.querySelector('.content-title').textContent = content.title.trim();
		element.querySelector('.content-label').textContent = content.label.trim();

		const object = new CSS3DObject(element);
		object.scale.set(0.25, 0.25, 0.25);
		global.scene.add(object);

		global.animations[`content${index}`] = function () {
			const start = global.start;
			const end = global.end;
			const offset = content.position;

			const alpha = GLOBAL.scroll - offset.z + 0.9;
			const position = start.clone().lerp(end, alpha);
			const x = (position.x / start.x) ** config.text.exponent * start.x;

			object.position.set(x + offset.x, position.y + offset.y, position.z);
		};
	}
}

export function updatePosition() {
	global.start = position(config.text.start, true);
	global.end = position(config.text.end, false);
}

function position(pos, scale) {
	const fov = THREE.MathUtils.degToRad(global.camera.fov);
	const aspect = window.innerWidth / window.innerHeight;

	const direction = new THREE.Vector3(pos.x * aspect * Math.tan(fov / 2), pos.y * Math.tan(fov / 2), -1).normalize();

	return direction.clone().multiplyScalar(pos.z * (scale ? (aspect + 3) / 4 : 1) / -direction.z);
}