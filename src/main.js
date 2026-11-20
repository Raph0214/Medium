import { setupScene } from './core/setup/scene';
import { createMesh } from './core/create/mesh';
import { setupPane } from './core/setup/pane';

function main() {
	setupScene();

	createMesh();

	setupPane();
}

main();