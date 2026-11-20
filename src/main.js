import * as THREE from 'three';
import { Pane } from 'tweakpane';

const global = {}

function main() {
	setupPane();
	setupScene();

	createMesh();
}

function setupPane() {
	const pane = new Pane({
		title: 'Config',
		expanded: true,
	});
	global.config = {
		planeRotation: {
			x: 0,
			y: 0,
		},
	};

	const backgroundPlane = pane.addFolder({
		title: 'Background Plane'
	})

	global.pane = {};
	global.pane.planeRotation = backgroundPlane.addBinding(global.config, 'planeRotation', {
		label: 'Rotation',
		view: 'slider',
		x: {
			min: 0,
			max: 90,
		},
		y: {
			min: 0,
			max: 45,
		},
	})
}

function setupScene() {
	const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();

	global.scene = new THREE.Scene();
	global.scene.background = new THREE.Color(backgroundColor);

	global.camera = new THREE.OrthographicCamera();
	global.camera.position.z = 10;

	global.renderer = new THREE.WebGLRenderer();
	global.renderer.setAnimationLoop(animate);
	document.body.appendChild(global.renderer.domElement);
}

function createMesh() {
	const resolution = 10;
	const size = 8;

	const geometry = new THREE.BufferGeometry();
	const material = new THREE.MeshBasicMaterial({
		color: 0x7f7f7f,
		wireframe: true,
	});

	const cellSize = size / resolution;
	const offset = size / 2;
	const positions = [];

	for (let x = 0; x < resolution; x++) {
		const left = x * cellSize - offset;
		const right = (x + 1) * cellSize - offset;

		for (let y = 0; y < resolution; y++) {
			const top = (y + 1) * cellSize - offset;
			const bottom = y * cellSize - offset;

			positions.push(
				left, top, 0,
				left, bottom, 0,
				right, top, 0,
				right, top, 0,
				left, bottom, 0,
				right, bottom, 0,
			);
		}
	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	geometry.computeVertexNormals();

	const plane = new THREE.Mesh(geometry, material);
	global.scene.add(plane);

	const radians = 1 / 180 * Math.PI;
	global.pane.planeRotation.on('change', (p) => {
		plane.setRotationFromEuler(new THREE.Euler(p.value.x * radians, -p.value.y * radians, 0))
	});
}

function animate(time) {
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