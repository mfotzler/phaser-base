import * as Phaser from 'phaser';
import MessageBus from './messageBus/MessageBus';
import getRealStorageProvider from './messageBus/realStorageProvider';

MessageBus.initialize(getRealStorageProvider());

new Phaser.Game({
	type: Phaser.AUTO,
	parent: 'game',
	backgroundColor: '#aaaaee',
	title: 'Minijam Template',
	scale: {
		width: 1920,
		height: 1080,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x: 0, y: 0 },
			debug: false
		}
	}
});
