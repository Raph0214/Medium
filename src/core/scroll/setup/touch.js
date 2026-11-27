import { global } from '../../global';

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
		if (!touching | !global.scrollEnabled) return;

		const y = event.clientY;
		last = last ? last : y;

		global.velocity += (y - last) / window.innerHeight * 5;
		last = y;
	});
}