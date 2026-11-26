import { pane } from './core/pane';
import { scroll } from './core/scroll';
import { background } from './core/background';
import { text } from './core/text';
import { intro } from './core/intro';
import { outro } from './core/outro';


function main() {
	pane();
	scroll();

	background();

	text();

	intro();
	outro();
}

main();