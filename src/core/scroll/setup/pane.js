import { global as GLOBAL } from '../../global';
import { config } from '../config';
import { global } from '../global';

export function setupPane() {
	const pane = GLOBAL.pane.addFolder({ title: 'Scroll' });

	range();
	scroll(pane);
	values(pane);
}

function range() {
	const scale = 5;

	global.min = -config.speed * scale;
	global.max = config.speed * scale;
}

function scroll(parent) {
	parent.addBinding(config, 'speed', {
		label: 'Speed',
		min: 0,
		max: 1,
	}).on('change', (ev) => {
		const velocity = global.velocity;

		range();

		velocity.min = global.min;
		velocity.max = global.max;
	});
	parent.addBinding(config, 'decay', {
		label: 'Decay',
		min: 0,
		max: 1,
	});
}

function values(parent) {
	global.velocity = parent.addBinding(GLOBAL, 'velocity', {
		readonly: true,
		view: 'graph',
		min: global.min,
		max: global.max,
	});
	global.scroll = parent.addBinding(GLOBAL, 'scroll', {
		readonly: true,
		view: 'graph',
		min: global.min,
		max: global.max,
	}).on('change', (ev) => {
		const value = ev.value;

		global.scroll.min = value + global.min;
		global.scroll.max = value + global.max;
	});
}