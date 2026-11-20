import * as THREE from 'three';
import { Pane } from 'tweakpane';
import { global } from "../global";
import { config } from '../config';
import { resize } from './scene';
import { createMesh } from '../create/mesh';
import { step } from 'three/tsl';

export function setupPane() {
	const pane = new Pane({
		title: 'Config',
		expanded: true,
	});

	global.pane = {};

	camera(pane);
	backgroundPlane(pane);
	statistics(pane);
}

function camera(pane) {
	const camera = pane.addFolder({ title: 'Camera' });

	global.pane.scale = camera.addBinding(config.camera, 'scale', {
		label: 'Scale',
		min: 1,
		step: 0.1,
	});
	global.pane.scale.on('change', resize);
}

const radians = 1 / 180 * Math.PI;
function backgroundPlane(pane) {
	const backgroundPlane = pane.addFolder({ title: 'Background Plane' });

	global.pane.size = backgroundPlane.addBinding(config.backgroundPlane, 'size', {
		label: 'Size',
		min: 1,
		step: 0.1,
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

	noise(backgroundPlane);
}

function noise(pane) {
	const noise = pane.addFolder({ title: 'Noise' });

	global.pane.speed = noise.addBinding(config.noise, 'speed', {
		label: 'Speed',
		min: 0,
		step: 0.1,
	});

	global.pane.amplitude = noise.addBinding(config.noise, 'amplitude', {
		label: 'Amplitude',
		min: 0,
		step: 0.1,
	});
	global.pane.amplitude.on('change', (ev) => {
		global.material.uniforms.uAmplitude.value = ev.value;
	})

	global.pane.frequency = noise.addBinding(config.noise, 'frequency', {
		label: 'Frequency',
		x: {
			min: 0,
			max: 10,
		},
		y: {
			min: 0,
			max: 10,
		},
	});
	global.pane.frequency.on('change', (ev) => {
		global.material.uniforms.uFrequency.value = new THREE.Vector2(ev.value.x, ev.value.y);
	})
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