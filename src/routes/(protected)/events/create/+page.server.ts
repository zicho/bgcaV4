import { getGame } from '$lib/db/queries/games/getGame';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { or, type InferModel, ilike, inArray } from 'drizzle-orm';
import { games, games as gamesTable } from '$lib/db/schema/games';
import { searchGameSchema } from '$lib/validationSchemas/searchGameSchema';
import { addGamesToEventSchema } from '$lib/validationSchemas/addGamesToEventSchema';
import { fail, type Cookies } from '@sveltejs/kit';
import { db } from '$lib/db/client';

export const load = (async (event) => {

    const { cookies, url } = event;

    const searchForm = await superValidate(searchGameSchema);
    const addEventForm = await superValidate(addGamesToEventSchema);

    type Game = InferModel<typeof gamesTable, "select">;

    const games: Game[] = [];
    const game_id = Number(url.searchParams.get("game_id"));
    const clear_prev = Boolean(url.searchParams.get("clear_prev"));

    url.searchParams.delete("clear_prev");

    if (game_id) {
        const game = await getGame(game_id);
        games.push(game);
        handleStoreIdsInCookie(cookies, [game.id], !clear_prev);
    }

    const cookieIds = handleGetIdsFromCookie(cookies).filter((x: number) => x !== game_id);

    if (cookieIds.length > 0) {
        const cookieGames = await db.select().from(gamesTable).where(
            inArray(gamesTable.id, cookieIds)
        );

        cookieGames.forEach(game => {
            games.push(game);
        });
    }

    return {
        searchForm,
        addEventForm,
        games
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    confirm: async (event) => {

        const { request } = event;

        const addEventForm = await superValidate(request, addGamesToEventSchema);

        console.dir(addEventForm)


        if (!addEventForm.valid) return fail(400, { addEventForm });




        return message(addEventForm, 'Login form submitted');
    },
    search: async ({ request, cookies }) => {
        const searchForm = await superValidate(request, searchGameSchema);

        if (!searchForm.valid) return fail(400, { searchForm });

        const q = searchForm.data.query.toString();
        // console.dir(`"%${q}%"`);

        const results = (await db.select({
            id: games.id
        }).from(games).where(
            or(
                ilike(games.name, `%${q}%`),
                ilike(games.slug, `%${q}%`),
            )
        )).map(x => x.id);

        if (results.length > 0) {
            handleStoreIdsInCookie(cookies, results);
        }

        return {
            searchForm
        };
    }
};

function removeDuplicates<T>(arr: T[]): T[] {
    return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

function handleStoreIdsInCookie(cookies: Cookies, ids: number[], deletePrevious: boolean = false) {
    const cookie = cookies.get("game_ids");

    if (!cookie || deletePrevious) {
        cookies.set("game_ids", JSON.stringify(ids));
    }
    else {
        const existing_ids = JSON.parse(cookie);
        const mergedArray: number[] = ids.concat(existing_ids);
        const deduplicatedArray = removeDuplicates(mergedArray);
        cookies.set("game_ids", JSON.stringify(deduplicatedArray));
    }
}

function handleGetIdsFromCookie(cookies: Cookies) {
    const cookie = cookies.get("game_ids");

    if (!cookie) return;

    return JSON.parse(cookie);

}