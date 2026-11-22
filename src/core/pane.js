import { Pane } from 'tweakpane';
import { global } from './global';

export function setupPane() {
	global.pane = new Pane({
		title: 'Config',
		expanded: true,
	});
}