import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';

export function setupCamera() {
	global.mouse = new THREE.Vector2(0, 0);

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

		const rotation = new THREE.Vector2(mouse.x * -angle * 0.5 * radians, mouse.y * -angle * 0.5 * radians, 0);
		const newRotation = prevRotation.lerp(rotation, Math.min(Math.max(delta / 1000 * camera.speed, 0), 1));
		prevRotation = newRotation;

		global.camera.rotation.set(newRotation.y, newRotation.x, 0);
	};
}

function track() {
	window.addEventListener('pointermove', (event) => {
		const mouse = global.mouse;
		mouse.x = event.clientX / window.innerWidth * 2 - 1;
		mouse.y = event.clientY / window.innerHeight * 2 - 1;
	});
}