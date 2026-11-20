import * as THREE from 'three';
import { Pane } from 'tweakpane';
import { global } from "../global";
import { config } from '../config';
import { createMesh } from '../create/mesh';

export function setupPane() {
	const pane = new Pane({
		title: 'Config',
		expanded: true,
	});

	backgroundPlane(pane);
	statistics(pane);
}

const radians = 1 / 180 * Math.PI;
function backgroundPlane(pane) {
	const backgroundPlane = pane.addFolder({ title: 'Background Plane' });

	global.pane = {};
	global.pane.size = backgroundPlane.addBinding(config.backgroundPlane, 'size', {
		label: 'Size',
		min: 1,
		step: 1,
	});
	global.pane.size.on('change', createMesh);

	global.pane.resolution = backgroundPlane.addBinding(config.backgroundPlane, 'resolution', {
		label: 'Resolution',
		min: 1,
		step: 1,
	});
	global.pane.resolution.on('change', createMesh);

	global.pane.wireframe = backgroundPlane.addBinding(config.backgroundPlane, 'wireframe', { label: 'Wireframe' });
	global.pane.wireframe.on('change', (ev) => {
		global.material.wireframe = ev.value;
	});

	global.pane.planeRotation = backgroundPlane.addBinding(config.backgroundPlane, 'rotation', {
		label: 'Rotation',
		x: {
			min: 0,
			max: 90,
		},
		y: {
			min: 0,
			max: 45,
		},
	});
	global.pane.planeRotation.on('change', (ev) => {
		global.plane.setRotationFromEuler(new THREE.Euler(ev.value.x * radians, -ev.value.y * radians, 0))
	});

	noise(pane, backgroundPlane);
}

function noise(pane, backgroundPlane) {
	const noise = backgroundPlane.addFolder({ title: 'Noise' });
}

function statistics(pane) {
	const statistics = pane.addFolder({ title: 'Statistics' });

	global.pane.time = statistics.addBlade({
		view: 'text',
		label: 'Time',
		parse: (v) => String(v),
		value: 0,
		readonly: true,
	});
	global.animations.pane = function (time) {
		global.pane.time.value = time;
	}

	global.pane.fps = statistics.addBlade({
		view: 'text',
		label: 'FPS',
		parse: (v) => String(v),
		value: 0,
		readonly: true,
	});
}