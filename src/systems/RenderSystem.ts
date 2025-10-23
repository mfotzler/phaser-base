import { EventType, StepData, System } from '../engine/types';
import { EntityCollection } from '../engine/world';
import BaseScene from '../scenes/BaseScene';
import {
	EntityDefinition,
	isRenderableEntity,
	RenderableEntityComponents
} from '../engine/entities/types';
import MessageBus from '../messageBus/MessageBus';
import { Renderable, Renderer } from './renderer/types';

export default class RenderSystem<TComponents> implements System {
	private sprites: { [id: string]: Renderable } = {};

	constructor(
		scene: BaseScene,
		private entityProvider: EntityCollection<TComponents>,
		private renderer: Renderer<TComponents>
	) {
		MessageBus.subscribe(
			EventType.ADD_ENTITY,
			({ entity }: { entity: EntityDefinition<TComponents> }) => {
				if (!isRenderableEntity(entity)) {
					return;
				}

				const { id, render } = entity;
				if (!this.sprites[id] && render) {
					const entitySprite = this.renderer.create(entity);
					this.sprites[id] = entitySprite;
					render.sprite = entitySprite;
					MessageBus.sendMessage(EventType.ENTITY_SPRITE_ADDED, { id, entitySprite, entity });
				}
			}
		);

		MessageBus.subscribe(EventType.ENTITY_DELETED, ({ entityId: id }) => {
			const entitySprite = this.sprites[id];
			if (entitySprite) {
				this.renderer.destroy(id, entitySprite);
				delete this.sprites[id];
			}
		});
	}

	step({}: StepData) {
		this.entityProvider.entities.forEach((entity) => {
			if (isRenderableEntity(entity)) {
				this.ensureEntityHasSprite(entity);
				this.renderer.update(entity);
			}
		});
	}

	private ensureEntityHasSprite(
		entity: EntityDefinition<TComponents & RenderableEntityComponents>
	) {
		if (!this.sprites[entity.id]) {
			this.sprites[entity.id] = entity.render.sprite ?? this.renderer.create(entity);
		}
		if (!entity.render.sprite) {
			entity.render.sprite = this.sprites[entity.id];
		}
	}
}
