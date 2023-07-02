export function handleLoginRedirect(
	url: URL,
	message: string = 'You must be logged in to access this page.'
): string {
	const redirectToUrl = url.pathname + url.search;
	return redirectToUrl 
        ? `/login?redirectTo=${redirectToUrl}&message=${message}` 
        : '/login';
}
