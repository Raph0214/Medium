import { setupPane } from './core/pane';
import { background } from './core/background';
import { text } from './core/text';


function main() {
	setupPane();

	background();

	text();
}

main();