import type { LuciaError } from 'lucia-auth';

export function parseLuciaError(err: LuciaError): string {
	switch (err.message) {
		case 'AUTH_DUPLICATE_KEY_ID':
			return 'Username already taken';
		case 'AUTH_INVALID_KEY_ID':
			return 'This user does not exist';
		case 'AUTH_INVALID_PASSWORD':
            return 'Incorrect password';
		default:
			return 'Unknown error';
	}
}
