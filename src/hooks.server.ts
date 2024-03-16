import PocketBase from 'pocketbase';
import { site } from '@valiantlynx/general-config';
import { serializeNonPOJOs } from '$lib/utils/api';
import { authStore } from '$lib/utils/stores';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(site.site.pocketbase);
	let storedAuth;
	// subscribe to the auth store
	authStore.subscribe((value) => {
		storedAuth = value;
	});
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		} else if (storedAuth) {
			event.locals.pb.authStore = storedAuth;
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (_) {
		await event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: true }));
	return response;
};