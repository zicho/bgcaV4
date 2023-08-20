import { getGame } from '$lib/db/queries/games/getGame';
import { suggestEventDateInsert } from '$lib/validationSchemas/suggestEventDateInsert';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {

    const form = await superValidate(event, suggestEventDateInsert);

    const { url } = event;

    const game_id = Number(url.searchParams.get("game_id"));

    if (game_id) {
        const game = await getGame(game_id);

        console.dir(game);

        return {
            form,
            game
        };
    }

    return {
        form
    };
}) satisfies PageServerLoad;


// export const actions: Actions = {
//     add_date: async (event) => {

//         const { request } = event;
//         const form = await superValidate(request, suggestEventDateInsert);

//         if (!form.valid) return fail(400, { form });

//         const { date, startTime } = form;

//         await db.insert(eventDates).values(
//             { date, startTime }
//         );

//         return {
//             success: true
//         };
//     }

// };