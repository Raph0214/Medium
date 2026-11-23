import { global } from '../../global';
import { config } from '../config';

export function setupTouch() {
	let touching = false;
	let last = null;

	window.addEventListener('pointerdown', () => {
		touching = true;
	});

	window.addEventListener('pointerup', () => {
		touching = false;
		last = null;
	});

	window.addEventListener('pointermove', (event) => {
		//console.log(event.pointerType);
		if (!touching) return;

		const y = event.clientY;
		last = last ? last : y;

		//console.log((last - y) / window.innerHeight, last, y);

		global.velocity -= (last - y) / window.innerHeight * config.speed * 10;
		last = y;
	});
}