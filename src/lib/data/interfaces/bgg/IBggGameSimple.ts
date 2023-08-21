import { createSlug } from "$lib/functions/util/createSlug";

export interface IBggGameSimple {
	gameId: number;
	name: string;
	image: string;
	thumbnail: string;
	minPlayers: number;
	maxPlayers: number;
	playingTime: number;
	isExpansion: boolean;
	yearPublished: number;
	averageRating: string;
}

export function parseIntoGame(dto: IBggGameSimple) {
	return {
		...dto,
		slug: createSlug(dto.name),
		bggId: dto.gameId,
		minNumberOfPlayers: dto.minPlayers,
		maxNumberOfPlayers: dto.maxPlayers,
		averageRating: dto.averageRating,
		thumbnailUrl: dto.thumbnail,
		imageUrl: dto.image
	};
}
