import * as THREE from 'three';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { global as GLOBAL } from '../../global';
import { global } from '../global';
import { config } from '../config';
import { content } from '/src/assets/content';

export function createText() {
	GLOBAL.contentHeight = 0;

	loadContent();

	updatePosition();
}

function smoothMin(a, b, k) {
	const h = Math.max(k - Math.abs(a - b), 0) / k;
	return Math.min(a, b) - h ** 2 * k * 0.25;
}

function smoothMax(a, b, k) {
	const h = Math.max(k - Math.abs(a - b), 0) / k;
	return Math.max(a, b) + h ** 2 * k * 0.25;
}

function loadContent() {
	const template = document.querySelector('#content');
	const contentStart = content.start;
	const contentEnd = content.end;
	const startScroll = contentStart.scroll - contentStart.smoothing;
	const endScroll = contentEnd.scroll - contentEnd.smoothing;

	for (const [index, item] of content.list.entries()) {
		const element = template.content.firstElementChild.cloneNode(true);
		element.querySelector('.content-title').textContent = item.title.trim();
		element.querySelector('.content-label').textContent = item.label.trim();

		const object = new CSS3DObject(element);
		object.scale.set(0.25, 0.25, 0.25);
		global.scene.add(object);

		global.animations[`content${index}`] = function () {
			const start = global.start;
			const end = global.end;

			const alpha = smoothMin(smoothMax(GLOBAL.scroll - startScroll, 0, contentStart.smoothing), endScroll - startScroll, contentEnd.smoothing) + content.offset;
			const position = start.clone().lerp(end, alpha - content.gap * index);
			const x = (position.x / start.x) ** config.text.exponent * start.x;

			object.position.set(x, position.y + GLOBAL.contentHeight, position.z);
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