import { pane } from './core/pane';
import { scroll } from './core/scroll';
import { background } from './core/background';
import { text } from './core/text';


function main() {
	pane();
	scroll();

	background();

	text();
}

main();