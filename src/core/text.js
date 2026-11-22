import { setupScene } from './text/setup/scene';
import { createText } from './text/create/text';
import { setupPane } from './text/setup/pane';

export function text() {
	setupScene();

	createText();

	setupPane();
}