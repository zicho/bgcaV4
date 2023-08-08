import type { IBggGameSimple } from "./IBggGameSimple";

export interface IBggGameDetailed extends IBggGameSimple {
	description: string;
}

export function parseIntoGame(dto: IBggGameDetailed) {
	return {
		...dto
	};
}
