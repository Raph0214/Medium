import { global } from "../../global";

const container = document.querySelector('#body-container');
const close = document.querySelector('#body-close');
const body = document.querySelector('#body-text');

const threshold = 5;
export function setupBody(element, content) {
	let x;
	let y;

	element.addEventListener('pointerdown', (event) => {
		x = event.clientX;
		y = event.clientY;
	});

	element.addEventListener('pointerup', (event) => {
		if (x === undefined) return;

		if (Math.hypot(event.clientX - x, event.clientY - y) < threshold) {
			body.textContent = content;

			show(true);

			//setTimeout(() => show(false), 2000);
		}

		x = y = undefined;
	});

	element.addEventListener('pointercancel', () => {
		x = y = undefined;
	});
}

close.addEventListener('click', () => {
	show(false);
});

const delay = 0.375 * 1000;
export function show(visible) {
	const scroll = container.scrollTop > window.innerHeight * 0.25;

	if (!visible & scroll) {
		container.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	setTimeout(() => {
		visibleText = visible ? 1 : -1;
	}, visible ? 0 : delay * (scroll ? 2 : 1));

	setTimeout(() => {
		global.scrollEnabled = !visible;
		container.style.transform = `translate(0%, ${visible ? 0 : 100}%)`;
	}, visible ? delay : delay * (scroll ? 1 : 0));
}

const duration = 0.5;
const exponent = 2;
const height = 250;

let visibleText = 0;
let alpha = 0;
let prevTime;
function animate(time) {
	requestAnimationFrame(animate);

	prevTime = prevTime ? prevTime : time;

	if (visibleText == 0) {
		prevTime = time;

		return;
	};

	alpha = Math.min(alpha + (time - prevTime) / 1000 / duration, 1);
	prevTime = time;

	const visible = visibleText > 0;

	const inAlpha = (1 - alpha) ** exponent;
	const outAlpha = alpha ** (1 / exponent);

	global.text.style.opacity = visible ? inAlpha : outAlpha;
	global.contentHeight = (visible ? outAlpha : inAlpha) * height;

	if (alpha >= 1) {
		visibleText = 0;
		alpha = 0;
	}
}
animate();