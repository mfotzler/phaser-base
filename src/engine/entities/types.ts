import type { Renderable } from '../../systems/renderer/types';
import { Direction } from '../types';

export interface RenderComponentBase {
	spriteKey: string;
	spriteSheet?: string;
	sprite?: Renderable;
	scale?: number;
	currentAnimation?: string;
	tickDelay?: number;
	width?: number;
	height?: number;
	fillColor?: number;
}

export interface FacingComponentBase {
	direction: Direction;
}

export interface RenderableEntityComponents {
	render: RenderComponentBase;
	facing: FacingComponentBase;
}

export type EntityDefinition<TComponents> = TComponents & {
	id: string;
};

export const isRenderableEntity = <TComponents>(
	entity: EntityDefinition<TComponents>
): entity is EntityDefinition<TComponents & RenderableEntityComponents> => {
	return 'render' in entity && 'facing' in entity;
};
