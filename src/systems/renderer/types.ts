import { EntityDefinition } from '../../engine/entities/types';

export type Renderable = {
	body: Phaser.Physics.Arcade.Body;
	transform: Phaser.GameObjects.Components.Transform &
		Phaser.GameObjects.Components.Origin &
		Phaser.GameObjects.Components.GetBounds;
};

export interface Renderer<TComponents> {
	create(entity: EntityDefinition<TComponents>): Renderable;
	update(entity: EntityDefinition<TComponents>): void;
	destroy(entityId: string, renderable: Renderable): void;
}
