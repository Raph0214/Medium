import * as THREE from 'three';
import { Pane } from 'tweakpane';
import { global } from "../global";
import { config } from '../config';

export function setupPane() {
	const pane = new Pane({
		title: 'Config',
		expanded: true,
	});

	const radians = 1 / 180 * Math.PI;
	const backgroundPlane = pane.addFolder({ title: 'Background Plane' })
	global.pane = {};

	global.pane.wireframe = backgroundPlane.addBinding(config.backgroundPlane, 'wireframe');
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
}