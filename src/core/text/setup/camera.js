import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';

export function setupCamera() {
	global.mouse = new THREE.Vector2();

	if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
		responsive();
		track();
	}
}

function responsive() {
	const radians = 1 / 180 * Math.PI;
	let prevTime = performance.now();
	let prevRotation = new THREE.Vector2();

	global.animations.camera = function (time) {
		const mouse = global.mouse;
		const camera = config.camera;
		const angle = camera.angle;

		const delta = time - prevTime;
		prevTime = time;

		const x = Math.min(Math.max(mouse.x / window.innerWidth * 2 - 1, -1), 1);
		const y = Math.min(Math.max(mouse.y / window.innerHeight * 2 - 1, -1), 1);

		const rotation = new THREE.Vector2(x * -angle * 0.5 * radians, y * -angle * 0.5 * radians, 0);
		const newRotation = prevRotation.lerp(rotation, Math.min(Math.max(delta / 1000 * camera.speed, 0), 1));
		prevRotation = newRotation;

		global.camera.rotation.set(newRotation.y, newRotation.x, 0);
	}
}

function track() {
	window.addEventListener('pointermove', (event) => {
		const mouse = global.mouse;
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	});
}