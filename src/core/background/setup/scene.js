import * as THREE from 'three';
import { global } from '../global';
import { config } from '../config';

export function setupScene() {
	const style = getComputedStyle(document.documentElement);
	global.backgroundColor = new THREE.Color(style.getPropertyValue('--background-color'));

	global.scene = new THREE.Scene();
	global.scene.background = global.backgroundColor;

	global.camera = new THREE.OrthographicCamera();
	global.camera.position.z = 10;

	global.renderer = new THREE.WebGLRenderer({ antialias: true });
	global.renderer.domElement.classList.add('background');
	document.body.appendChild(global.renderer.domElement);

	resize();
	animate();
}

function animate(time) {
	requestAnimationFrame(animate);

	for (const animation of Object.values(global.animations)) {
		if (!animation) return;

		animation(time);
	}

	global.renderer.render(global.scene, global.camera);
}

window.addEventListener('resize', resize);
export function resize() {
	const scale = config.camera.scale;

	const width = window.innerWidth;
	const height = window.innerHeight;
	const aspect = width / height;
	const size = scale * Math.min(1, aspect);

	global.camera.left = -size / 2;
	global.camera.right = size / 2;
	global.camera.top = size / (2 * aspect);
	global.camera.bottom = -size / (2 * aspect);
	global.camera.updateProjectionMatrix();

	global.renderer.setSize(width, height, true);
	global.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}