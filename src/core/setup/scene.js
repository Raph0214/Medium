import * as THREE from 'three';
import { global } from "../global";

export function setupScene() {
	const style = getComputedStyle(document.documentElement)
	const backgroundColor = style.getPropertyValue('--background-color');

	global.scene = new THREE.Scene();
	global.scene.background = new THREE.Color(backgroundColor);

	global.camera = new THREE.OrthographicCamera();
	global.camera.position.z = 10;

	global.renderer = new THREE.WebGLRenderer();
	global.renderer.setAnimationLoop(animate);
	document.body.appendChild(global.renderer.domElement);

	resize();
}

function animate(time) {
	global.animations.forEach(animation => {
		animation(time);
	});

	global.renderer.render(global.scene, global.camera);
}

window.addEventListener('resize', resize);
function resize() {
	const scale = 10;

	const width = window.innerWidth;
	const height = window.innerHeight;
	const aspect = width / height;

	global.camera.left = aspect / -2 * scale;
	global.camera.right = aspect / 2 * scale;
	global.camera.top = 0.5 * scale;
	global.camera.bottom = -0.5 * scale;
	global.camera.updateProjectionMatrix();

	global.renderer.setSize(width, height, true);
	global.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}