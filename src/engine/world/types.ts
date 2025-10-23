import { EntityDefinition } from '../entities/types';

export interface Point {
	x: number;
	y: number;
}

export interface EntityIdProvider {
	createEntityId: () => string;
}

export interface EntityProvider<TComponents> extends EntityIdProvider {
	entities: EntityDefinition<TComponents>[];
	getEntity: (id: string) => EntityDefinition<TComponents> | undefined;
}
