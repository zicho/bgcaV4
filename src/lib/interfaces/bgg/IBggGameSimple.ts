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
	bggRating: string;
}

export function parseIntoGame(dto: IBggGameSimple) {
	return {
		...dto,
		bggId: dto.gameId,
		minNumberOfPlayers: dto.minPlayers,
		maxNumberOfPlayers: dto.maxPlayers,
		bggRating: dto.bggRating,
		thumbnailUrl: dto.thumbnail,
		imageUrl: dto.image,
	};
}
