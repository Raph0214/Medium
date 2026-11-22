import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { global } from '../global';
import { config } from '../config';
import { updatePosition } from '../create/text';

export function setupScene() {
	global.scene = new THREE.Scene();
	global.camera = new THREE.PerspectiveCamera(config.camera.FOV,
		window.innerWidth / window.innerHeight,
		0.1,
		2000);

	global.renderer = new CSS3DRenderer({ antialias: true });
	global.renderer.domElement.classList.add('text');
	//global.renderer.domElement.style.position = 'fixed';
	document.body.appendChild(global.renderer.domElement);

	resize();
	animate();
}

function animate(time) {
	requestAnimationFrame(animate);

	for (const [key, animation] of Object.entries(global.animations)) {
		if (!animation) return;

		animation(time);
	}

	global.renderer.render(global.scene, global.camera);
}

window.addEventListener('resize', resize);
export function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	global.camera.aspect = width / height;
	global.camera.updateProjectionMatrix();

	global.renderer.setSize(width, height, true);

	updatePosition();
}