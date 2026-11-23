import { Pane } from 'tweakpane';
import { global } from './global';

export function pane() {
	global.pane = new Pane({ title: 'Config' });
}