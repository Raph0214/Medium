import { global as GLOBAL } from '../../global';
import { global } from '../global';
import { config } from '../config';
import { updatePosition } from '../create/text';

export function setupPane() {
	const pane = GLOBAL.pane.addFolder({ title: 'Text' });

	camera(pane);
	text(pane);
}

function camera(parent) {
	const camera = parent.addFolder({ title: 'Camera' });

	camera.addBinding(config.camera, 'FOV', {
		label: 'FOV',
		min: 1,
		max: 120,
		step: 1,
	}).on('change', (ev) => {
		global.camera.fov = ev.value;
		global.camera.updateProjectionMatrix();

		updatePosition();
	});

	camera.addBinding(config.camera, 'speed', {
		label: 'Speed',
		min: 0,
		max: 10,
		step: 0.1,
	});

	camera.addBinding(config.camera, 'angle', {
		label: 'Angle',
		min: 0,
		max: 45,
		step: 1,
	});
}

function text(parent) {
	const text = parent.addFolder({ title: 'Text' });

	text.addBinding(config.text, 'start', {
		label: 'Start',
		x: {
			min: -1,
			max: 1,
			step: 0.1,
		},
		y: {
			min: -1,
			max: 1,
			step: 0.1,
		},
		z: {
			step: 1,
		},
	}).on('change', updatePosition);
	text.addBinding(config.text, 'end', {
		label: 'End',
		x: {
			min: -1,
			max: 1,
			step: 0.1,
		},
		y: {
			min: -1,
			max: 1,
			step: 0.1,
		},
		z: {
			step: 1,
		},
	}).on('change', updatePosition);

	text.addBinding(config.text, 'exponent', {
		label: 'Exponent',
		min: 0,
		step: 0.1,
	});
}