import { global } from '../../global';

export function setupWheel() {
	window.addEventListener('wheel', (event) => {
		const mode = event.deltaMode;
		const height = window.innerHeight;
		let delta = event.deltaY;

		if (mode == 1) delta *= 16;
		if (mode == 2) delta *= height;

		global.velocity += delta / height;
	});
}