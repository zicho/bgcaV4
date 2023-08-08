declare global {
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
		interface PageData {
			flash?: {
				type: "success" | "error" | "info" | "warning";
				message: string;
			};
		}
	}
}

/// <reference types="lucia" />
declare global {
	declare namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			username: string;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};
