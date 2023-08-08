import { browser } from '$app/environment';
import { PUBLIC_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Toaster, toast } from 'svelte-sonner';

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
	private username?: string;

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
		console.log(payload);

		if (payload.table === 'profile_info' && payload.eventType === EventType.UPDATE) {
			toast.success('test');
		}
	}
}

export const realtimeStore = new RealtimeStore();
