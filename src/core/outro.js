import { global } from "./global";
import { config } from "./scroll/config";

export function outro() {
	animate();
}

const container = document.querySelector('#end-container');
const max = config.limits.max;

const range = 0.25;
const offset = 0.1;
const exponent = 2;

const textRange = 0.25;
const textExponent = 3;

const contentHeight = 250;
const contentExponent = 2;

let prevScroll = 0;
function animate() {
	requestAnimationFrame(animate);

	const scroll = global.scroll;
	const scrollRange = max - range;

	if (scroll > scrollRange) {
		global.text.hidden = (scroll - scrollRange) > (textRange * range);
	}

	if ((scroll == max & prevScroll == max) | (scroll < scrollRange & prevScroll < scrollRange) | scroll == prevScroll) return;
	prevScroll = scroll;

	const alpha = Math.min((max - scroll) / range, 1);

	container.style.transform = `translate(0%, ${100 * Math.min(alpha / (1 - offset), 1) ** exponent}%)`;

	global.text.style.opacity = 1 - Math.min((1 - alpha) / textRange, 1) ** (1 / textExponent);
	global.contentHeight = contentHeight * (1 - alpha ** contentExponent);
}