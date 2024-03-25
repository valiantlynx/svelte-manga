import { redirect } from '@sveltejs/kit';

export const POST = async (event) => {
	console.log(event.locals.user.id)


	// Clear server-side auth state
	await event.locals.pb.authStore.clear();

	event.locals.user = undefined;

	// Clear the authentication cookie
	event.cookies.set('pb_auth', '', { path: '/', httpOnly: true, secure: true, expires: new Date(0) });


	throw redirect(303, '/login');
};
