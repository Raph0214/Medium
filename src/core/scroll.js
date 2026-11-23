import { global } from './global';
import { config } from './scroll/config';
import { setupPane } from './scroll/setup/pane';

export function scroll() {
	track();

	setupPane();

	animate();
}

function track() {
	global.velocity = 0;
	global.scroll = 0;

	window.addEventListener('wheel', (event) => {
		const delta = event.deltaY;
		const mode = event.deltaMode;
		const height = window.innerHeight;

		if (mode == 1) delta *= 16;
		if (mode == 2) delta *= window.innerHeight;

		global.velocity += delta / height * config.speed;
	});
}

let prevTime = performance.now();
function animate(time = 0) {
	requestAnimationFrame(animate);

	const delta = (time - prevTime) / 1000;
	prevTime = time;

	global.velocity *= (1 - config.decay) ** delta;
	global.scroll += global.velocity * delta;
}