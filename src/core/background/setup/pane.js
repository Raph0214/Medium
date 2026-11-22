import * as THREE from 'three';
import { Pane } from 'tweakpane';
import { global } from "../global";
import { config } from '../config';
import { resize } from '../setup/scene';
import { rotate } from '../create/mesh';
import { createGeometry } from '../create/geometry';

export function setupPane() {
	const pane = new Pane({
		title: 'Config',
		expanded: true,
	});

	camera(pane);
	background(pane);
	grain(pane);
}

function camera(pane) {
	const camera = pane.addFolder({ title: 'Camera' });

	camera.addBinding(config.camera, 'scale', {
		label: 'Scale',
		min: 1,
		step: 0.1,
	}).on('change', resize);
}

function background(pane) {
	const background = pane.addFolder({ title: 'Background' });

	background.addBinding(config.background, 'size', {
		label: 'Size',
		x: {
			min: 1,
			step: 0.1,
		},
		y: {
			min: 1,
			step: 0.1,
		},
	}).on('change', createGeometry);

	background.addBinding(config.background, 'resolution', {
		label: 'Resolution',
		min: 1,
		step: 1,
	}).on('change', createGeometry);

	background.addBinding(config.background, 'wireframe', { label: 'Wireframe' }).on('change', (ev) => {
		global.material.wireframe = ev.value;
		global.material.uniforms.uBaseColor.value = ev.value ? new THREE.Color(0.25, 0.25, 0.25) : global.backgroundColor;
	});

	background.addBinding(config.background, 'rotation', {
		label: 'Rotation',
		x: {
			min: 0,
			max: 90,
		},
		y: {
			min: 0,
			max: 45,
		},
	}).on('change', (ev) => {
		rotate(ev.value);
	});

	wave(background);
	color(background);
}

function wave(pane) {
	const wave = pane.addFolder({ title: 'Wave' });

	wave.addBinding(config.wave, 'speed', {
		label: 'Speed',
		min: 0,
		step: 0.1,
	});

	wave.addBinding(config.wave, 'amplitude', {
		label: 'Amplitude',
		min: 0,
		step: 0.1,
	}).on('change', (ev) => {
		global.material.uniforms.uAmplitude.value = ev.value;
	});

	wave.addBinding(config.wave, 'frequency', {
		label: 'Frequency',
		x: {
			min: 0,
			max: 10,
		},
		y: {
			min: 0,
			max: 10,
		},
	}).on('change', (ev) => {
		global.material.uniforms.uWaveFrequency.value = new THREE.Vector2(ev.value.x, ev.value.y);
	});
}

function color(pane) {
	const color = pane.addFolder({ title: 'Color' });

	color.addBinding(config.color, 'frequency', {
		label: 'Frequency',
		x: {
			min: 0,
			max: 10,
		},
		y: {
			min: 0,
			max: 10,
		},
	}).on('change', (ev) => {
		global.material.uniforms.uColorFrequency.value = new THREE.Vector2(ev.value.x, ev.value.y);
	});

	primary(color);
	secondary(color);
}

function primary(pane) {
	const primary = pane.addFolder({ title: 'Primary' });

	primary.addBinding(config.color.primary, 'color', {
		label: 'Color',
	}).on('change', (ev) => {
		global.material.uniforms.uPrimaryColor.value = new THREE.Color(`rgb(${Math.round(ev.value.r)}, ${Math.round(ev.value.g)}, ${Math.round(ev.value.b)})`);
	});

	const primaryMin = primary.addBinding(config.color.primary, 'min', {
		label: 'Min',
		min: 0,
		max: config.color.primary.max,
	});
	const primaryMax = primary.addBinding(config.color.primary, 'max', {
		label: 'Max',
		min: config.color.primary.min,
		max: 1,
	});
	primaryMin.on('change', (ev) => {
		primaryMax.min = ev.value;
		primaryMax.value = Math.max(primaryMax.value, ev.value);

		global.material.uniforms.uPrimaryMin.value = ev.value;
	});
	primaryMax.on('change', (ev) => {
		primaryMin.max = ev.value;
		primaryMin.value = Math.min(primaryMin.value, ev.value);

		global.material.uniforms.uPrimaryMax.value = ev.value;
	});
}

function secondary(pane) {
	const secondary = pane.addFolder({ title: 'Secondary' });

	secondary.addBinding(config.color.secondary, 'color', {
		label: 'Color',
	}).on('change', (ev) => {
		global.material.uniforms.uSecondaryColor.value = new THREE.Color(`rgb(${Math.round(ev.value.r)}, ${Math.round(ev.value.g)}, ${Math.round(ev.value.b)})`);
	});

	const primaryMin = secondary.addBinding(config.color.secondary, 'min', {
		label: 'Min',
		min: 0,
		max: config.color.secondary.max,
	});
	const primaryMax = secondary.addBinding(config.color.secondary, 'max', {
		label: 'Max',
		min: config.color.secondary.min,
		max: 1,
	});
	primaryMin.on('change', (ev) => {
		primaryMax.min = ev.value;
		primaryMax.value = Math.max(primaryMax.value, ev.value);

		global.material.uniforms.uSecondaryMin.value = ev.value;
	});
	primaryMax.on('change', (ev) => {
		primaryMin.max = ev.value;
		primaryMin.value = Math.min(primaryMin.value, ev.value);

		global.material.uniforms.uSecondaryMax.value = ev.value;
	});
}

function grain(pane) {
	const grain = pane.addFolder({ title: 'Grain' });

	grain.addBinding(config.grain, 'color', {
		label: 'Color',
	}).on('change', (ev) => {
		global.material.uniforms.uGrainColor.value = new THREE.Color(`rgb(${Math.round(ev.value.r)}, ${Math.round(ev.value.g)}, ${Math.round(ev.value.b)})`);
	});

	grain.addBinding(config.grain, 'amount', {
		label: 'Amount',
		min: 0,
		max: 1,
	}).on('change', (ev) => {
		global.material.uniforms.uGrainAmount.value = ev.value;
	});
	grain.addBinding(config.grain, 'exponent', {
		label: 'Exponent',
		min: 0,
		step: 1,
	}).on('change', (ev) => {
		global.material.uniforms.uGrainExponent.value = ev.value;
	});
}