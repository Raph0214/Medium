import { global as GLOBAL } from '../../global';
import { config } from '../config';

export function setupPane() {
	const pane = GLOBAL.pane.addFolder({
		title: 'Scroll',
		expanded: false,
	});

	scroll(pane);
	values(pane);
}

function scroll(parent) {
	parent.addBinding(config, 'speed', {
		label: 'Speed',
		min: 0,
		max: 1,
	});
	parent.addBinding(config, 'decay', {
		label: 'Decay',
		min: 0,
		max: 1,
	});

	limits(parent);
}

function limits(parent) {
	const limits = parent.addFolder({ title: 'Limits' });

	limits.addBinding(config.limits, 'min', { label: 'Min' });
	limits.addBinding(config.limits, 'max', { label: 'Max' });
}

function values(parent) {
	const scale = 5;
	let min = -config.speed * scale;
	let max = config.speed * scale;

	parent.addBinding(GLOBAL, 'velocity', {
		readonly: true,
		view: 'graph',
		min: -5,
		max: 5,
	});
	const scroll = parent.addBinding(GLOBAL, 'scroll', {
		readonly: true,
		view: 'graph',
		min: min,
		max: max,
	}).on('change', (ev) => {
		const value = ev.value;

		scroll.min = value + min;
		scroll.max = value + max;
	});
}