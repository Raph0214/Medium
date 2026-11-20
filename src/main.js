import * as THREE from 'three';

const global = {}

function main() {
	createScene();

	createMesh();
}

function createScene() {
	global.scene = new THREE.Scene();
	global.camera = new THREE.OrthographicCamera();
	global.camera.position.z = 5;

	global.renderer = new THREE.WebGLRenderer();
	global.renderer.setAnimationLoop(animate);
	document.body.appendChild(global.renderer.domElement);
}

function createMesh() {
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	global.cube = new THREE.Mesh(geometry, material);
	global.scene.add(global.cube);
}

function animate(time) {
	global.cube.rotation.x = time / 2000;
	global.cube.rotation.y = time / 1000;

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

main();
resize();