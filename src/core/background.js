import { setupScene } from './background/setup/scene';
import { createMesh } from './background/create/mesh';
import { setupPane } from './background/setup/pane';

export function background() {
	setupScene();

	createMesh();

	setupPane();
}