import { cloneDeep, merge } from 'lodash';
import MessageBus from '../../messageBus/MessageBus';
import BaseScene from '../../scenes/BaseScene';
import { EventType } from '../types';
import { EntityCollection } from './entityCollection';

export class World<TComponents> {
	entityProvider: EntityCollection<TComponents>;
	map: Phaser.Tilemaps.Tilemap;
	wallLayer: Phaser.Tilemaps.TilemapLayer;
	playerId: string;

	constructor(private scene: BaseScene) {
		this.entityProvider = new EntityCollection();
	}

	initializeMap(key: string): void {
		this.map = this.scene.make.tilemap({ key });
		const tileset = this.map.addTilesetImage('background', 'tiles');
		this.wallLayer = this.map.createLayer(0, tileset, 0, 0);
	}

	createEntity(base: TComponents, data: Partial<TComponents>): string {
		const id = this.entityProvider.createEntityId();
		MessageBus.sendMessage(EventType.ADD_ENTITY, {
			entity: {
				...merge(cloneDeep(base), data),
				id
			}
		});
		return id;
	}
}
