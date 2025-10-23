import { EntityDefinition, RenderableEntityComponents } from '../../engine/entities/types';
import { Direction } from '../../engine/types';
import BaseScene from '../../scenes/BaseScene';
import { Renderer, Renderable } from './types';

export class SpriteRenderer<TComponents extends RenderableEntityComponents>
	implements Renderer<TComponents>
{
	private sprites: { [id: string]: Phaser.Physics.Arcade.Sprite } = {};

	constructor(private scene: BaseScene) {}

	public create({ id, render }: EntityDefinition<TComponents>): Renderable {
		const sprite = this.scene.physics.add
			.sprite(0, 0, render.spriteSheet ?? 'textures', render.spriteKey)
			.setScale(render.scale ?? 1);

		this.sprites[id] = sprite;

		return {
			body: sprite.body,
			transform: sprite
		};
	}

	public update(entity: EntityDefinition<TComponents>): void {
		const { render, facing } = entity;

		if (render.currentAnimation) {
			if (this.sprites[entity.id].anims?.currentAnim?.key !== render.currentAnimation) {
				this.sprites[entity.id].anims.play(render.currentAnimation, true);
				if (render.tickDelay) {
					this.sprites[entity.id].anims.nextTick = render.tickDelay;
				}
			}
		} else {
			this.sprites[entity.id].anims.stop();
		}

		if (facing) {
			this.sprites[entity.id].setFlipX(facing.direction === Direction.LEFT);
		}
	}

	public destroy(entityId: string, renderable: Renderable): void {
		this.sprites[entityId].destroy();
	}
}
