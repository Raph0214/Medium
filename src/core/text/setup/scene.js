import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { global } from '../global';
import { config } from '../config';
import { updatePosition } from '../create/text';

export function setupScene() {
	global.scene = new THREE.Scene();
	global.camera = new THREE.PerspectiveCamera(config.camera.FOV);

	global.renderer = new CSS3DRenderer({ antialias: true });
	global.renderer.domElement.classList.add('text');
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
	const width = window.innerWidth;
	const height = window.innerHeight;
	const aspect = width / height;
	const baseFOV = THREE.MathUtils.degToRad(config.camera.FOV);

	global.camera.aspect = aspect;
	global.camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(baseFOV / 2) * Math.max(1, 1 / aspect)));
	global.camera.updateProjectionMatrix();

	global.renderer.setSize(width, height, true);

	updatePosition();
}