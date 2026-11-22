import { setupScene } from './text/setup/scene';
import { createText } from './text/create/text';
import { setupCamera } from './text/setup/camera';
import { setupPane } from './text/setup/pane';

export function text() {
	setupScene();

	createText();

	setupCamera();

	setupPane();
}