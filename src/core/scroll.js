import { global } from './global';
import { config } from './scroll/config';
import { setupPane } from './scroll/setup/pane';
import { setupTouch } from './scroll/setup/touch';
import { setupWheel } from './scroll/setup/wheel';

export function scroll() {
	global.velocity = 0;
	global.scroll = 0;

	setupPane();

	setupWheel();
	setupTouch();

	animate();
}

let prevTime = performance.now();
function animate(time = 0) {
	requestAnimationFrame(animate);

	const delta = (time - prevTime) / 1000;
	prevTime = time;

	global.velocity *= (1 - config.decay) ** delta;
	global.scroll += global.velocity * config.speed * delta;
	global.scroll = Math.max(global.scroll, 0);
}