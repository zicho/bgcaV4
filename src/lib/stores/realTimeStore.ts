import { browser } from '$app/environment';
import { PUBLIC_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Notyf } from 'notyf';

enum EventType {
	INSERT = 'INSERT',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE'
}

interface IPayload {
	schema: string;
	table: string;
	commit_timestamp: string;
	eventType: EventType;
	new: {
		description: string;
		id: number;
		signature: string;
		user_id: string;
	};
	old: {
		id: number;
	};
	errors: null;
}

class RealtimeStore {
	private supabase: SupabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_ANON_KEY);
	private notyf?: Notyf;
    private username?: string;

	constructor() {
		if (browser) {
			this.notyf = new Notyf({
				// delay time
				// 0 = infinite duration
				duration: 5000,
				// enable ripple effect
				ripple: true,
				// custom position
				position: { x: 'right', y: 'bottom' },
				// allow users to dismiss notifications via button
				dismissible: true,

				types: [
					{
						type: 'warning', // Notification type
						duration: 2000,
						ripple: true,
						message: 'custom message',
						background: 'orange',
						icon: {
							className: 'material-icons',
							tagName: 'i',
							text: 'warning'
						}
					}
				]
			});
		}
	}

	unsub(): void {
		if (browser) {
			this.supabase
				.channel('schema-db-changes')
				.on(
					'postgres_changes',
					{
						event: '*',
						schema: 'public'
					},
					(payload: any) => console.log(payload)
				)
				.unsubscribe();
		}
	}

	sub(username: string): void {
		if (browser) {
			this.unsub();
            this.username = username;

			this.supabase
				.channel('schema-db-changes')
				.on(
					'postgres_changes',
					{
						event: '*',
						schema: 'public'
					},
					(payload: any) => this.handleEvent(payload)
				)
				.subscribe();
		}
	}

	handleEvent(payload: IPayload): void {
		if (payload.table === 'profile_info' && payload.eventType === EventType.UPDATE) {
			this.notyf?.success("<a href='/'>mnoruenreåi0o</a>");
		}
	}
}

export const realtimeStore = new RealtimeStore();
