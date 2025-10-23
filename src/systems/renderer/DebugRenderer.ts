import { EntityDefinition, RenderableEntityComponents } from '../../engine/entities/types';
import BaseScene from '../../scenes/BaseScene';
import { Renderable, Renderer } from './types';

export class DebugRenderer<TComponents extends RenderableEntityComponents>
	implements Renderer<TComponents>
{
	constructor(private scene: BaseScene) {}

	public create({ render }: EntityDefinition<TComponents>): Renderable {
		const rect = this.scene.add.rectangle(
			0,
			0,
			render.width ?? 32,
			render.height ?? 32,
			render.fillColor ?? 0xcc00cc
		);
		const withBody = this.scene.physics.add.existing(rect);
		return {
			body: withBody.body as Phaser.Physics.Arcade.Body,
			transform: rect
		};
	}

	public update(entity: EntityDefinition<TComponents>): void {
		// no-op, it's just a rectangle
	}

	public destroy(entityId: string, renderable: Renderable): void {
		(renderable.transform as Phaser.GameObjects.Rectangle).destroy();
	}
}
