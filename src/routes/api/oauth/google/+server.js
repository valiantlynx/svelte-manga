// +server.js
/* eslint-disable no-console */
import { redirect } from '@sveltejs/kit';
import { authStore } from '$lib/utils/stores';

export const GET = async ({ locals, url, cookies }) => {
	const redirectUrl = `${url.origin}/api/oauth/google`;
	const expectedState = cookies.get('state');
	const expectedVerifier = cookies.get('verifier');

	//! everytime the listAuthMethods is called, the verifier changes. so we cant get the verifier pocketbase function hook. cause it will be different from the one we saved in the cookie from the action hook

	const gState = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	const authMethods = await locals.pb?.collection('users').listAuthMethods(); //generates a state and a NEW verifier
	if (!authMethods?.authProviders) {
		console.error('no auth Providers');
		throw redirect(302, '/signup');
	}

	const googleAuthProvider = authMethods.authProviders.find(
		(provider) => provider.name === 'google'
	);
	if (!googleAuthProvider) {
		console.error('Provider not found');
		throw redirect(302, '/signup');
	}

	if (expectedState !== gState) {
		console.error('state mismatch', expectedState, gState);
		throw redirect(302, '/signup');
	}

	try {
		await locals.pb
			?.collection('users')
			.authWithOAuth2Code(googleAuthProvider.name, code, expectedVerifier, redirectUrl, {
				role: ['user']
			}); // the object will reset the properties on that user when they are created on pocketbase
		await locals.pb.collection('users').authRefresh();
		locals.pb.authStore = locals.pb.authStore;
		// export the cookie to the client
		// TODO: the cookie is not being set on the client
		await cookies.set('pb_auth', locals.pb.authStore);
		await locals.pb.authStore.exportToCookie(cookies);

		// set store for now until we can get the cookie to work
		authStore.set(locals.pb.authStore);
	} catch (e) {
		console.log('Error Signing up with google auth', e, e.message);
	}
	// redirect to dashboard
	throw redirect(303, '/dashboard');
};
