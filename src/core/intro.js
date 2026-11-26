import { global } from "./global";

export function intro() {
	animate();
}

function lerp(a, b, t) {
	return a + (b - a) * t;
}

const background = document.querySelector('#start-background');
const title = document.querySelector('#start-title');
const guide = document.querySelector('#start-guide');
const disclaimer = document.querySelector('#start-disclaimer');

const range = 0.25;

const backgroundRange = 0.75;
const backgroundExponent = 0.5;

const titleRange = 0.25;
const titleHeight = 200;
const titleExponent = 0.75;

const textRange = 0.25;
const textOffset = 0.05;
const textExponent = 3;

const contentHeight = 250;
const contentExponent = 3;

let prevScroll;
function animate() {
	requestAnimationFrame(animate);

	const scroll = global.scroll;

	if ((scroll == 0 & prevScroll == 0) | (scroll > range & prevScroll > range) | scroll == prevScroll) return;
	prevScroll = scroll;

	const alpha = Math.min(scroll / range, 1);
	const fast = Math.min(alpha / backgroundRange, 1) ** backgroundExponent;
	const slow = alpha ** backgroundExponent;

	background.style.clipPath = `polygon(
		evenodd,
		0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
		${lerp(50, 0, slow)}% ${lerp(50, 0, slow)}%,
		${lerp(50, 100, fast)}% ${lerp(50, 0, fast)}%,
		${lerp(50, 100, slow)}% ${lerp(50, 100, slow)}%,
		${lerp(50, 0, fast)}% ${lerp(50, 100, fast)}%,
		${lerp(50, 0, slow)}% ${lerp(50, 0, slow)}%
	)`;

	const opacity = 1 - Math.min(alpha / titleRange, 1) ** (1 / titleExponent);

	title.style.transform = `translate(0px, ${titleHeight * alpha ** titleExponent}%)`;
	title.style.opacity = opacity;
	guide.style.opacity = opacity * 0.4;
	disclaimer.style.opacity = opacity * 0.4;

	global.text.style.opacity = (Math.max(alpha - textOffset, 0) / textRange) ** textExponent;
	global.contentHeight = contentHeight * (1 - alpha) ** contentExponent;
}