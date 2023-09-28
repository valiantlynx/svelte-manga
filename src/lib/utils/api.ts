import PocketBase from 'pocketbase';
import { authData } from '$lib/utils/stores';
import { goto } from '$app/navigation';
import { site } from '$lib/config/site';

export const pb = new PocketBase(site.pocketbase);

export const authPocketbase = async (user: string, password: string) => {
	const res = await pb.collection('users').authWithPassword(user, password);
	authData.set(pb.authStore.model);
	if (!pb.authStore.isValid) {
		throw { status: pb.authStore.isValid, message: pb.authStore.token };
	} else {
		return res;
	}
};

export const logoutPocketbase = async () => {
	pb.authStore.clear();
	authData.set({});
	window.location.reload();
	goto('/');
	if (!pb.authStore.isValid) {
		return { status: 200, message: 'logged out' };
	} else {
		throw { message: 'something went wrong' };
	}
};

export const createPocketbaseUser = async (data: any) => {
	const res = await pb.collection('users').create(data);
	authData.set(res);

	// (optional) send an email verification request
	await pb.collection('users').requestVerification(data.email);

	// login the user
	await authPocketbase(data.username, data.password);

	if (!pb.authStore.isValid) {
		throw { status: pb.authStore.isValid, message: pb.authStore.token };
	} else {
		return res;
	}
};

export const authPocketbaseAdmin = async (user: string, password: string) => {
	const res = await pb.admins.authWithPassword(user, password);
	authData.set(res);

	if (!pb.authStore.isValid) {
		throw { status: pb.authStore.isValid, message: pb.authStore.token };
	} else {
		return res;
	}
};

// refresh the login data
export const refreshAuthPocketbase = async () => {
	// Update authData store
	const user = await pb.collection('users').authRefresh({
		refreshToken: pb.authStore.token
	});
	authData.set(user);

	return user;
};

const menuItems = [
	{ id: 1, name: 'Item 1', price: 10, description: 'Description of item 1' },
	{ id: 2, name: 'Item 2', price: 15, description: 'Description of item 2' }
	// Add more menu items as needed
];

export async function fetchMenuItems() {
	// Simulate API request delay with a timeout
	await new Promise((resolve) => setTimeout(resolve, 500));

	return menuItems;
}

export async function placeOrder(orderData: any) {
	// Simulate API request delay with a timeout
	await new Promise((resolve) => setTimeout(resolve, 1000));
	// Return a mock order confirmation response
	return {
		orderId: 12345,
		totalAmount: orderData.totalAmount,
		deliveryAddress: orderData.deliveryAddress
	};
}

export const getPocketbase = async (collection: string, data: any) => {
	const resultList = await pb.collection(collection).getList(1, 8, data);
	return resultList;
};

export const postPocketbase = async (collection: string, data: any) => {
	const resultList = await pb.collection(collection).create(data);
	return resultList;
};

export const patchPocketbase = async (collection: string, id: string, data: any) => {
	const response = await pb.collection(collection).update(id, data);
	return response;
};

export const patchPocketbase1only = async (collection: string, id: string, data: any) => {
	const response = await pb.collection(collection).update(id, data);
	return response;
};

export const getImage = async (url: string, width: number, height: number) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'image/jpeg',
			'Access-Control-Allow-Origin': 'https://ww6.manganelo.tv'
		}
	});

	if (response.ok) {
		const originalImageBlob = await response.blob();

		const compressedImageBlob = await compressFileImage(originalImageBlob, width, height, 1); // 1 = 100% quality (no compression) - change as needed, e.g 0 = 0% quality (full compression)

		return URL.createObjectURL(compressedImageBlob);
	}

	throw new Error('Failed to fetch image');
};

export const compressFileImage = async (
	file: any,
	width: number,
	height: number,
	quality: number
): Promise<File> => {
	return new Promise<File>((resolve) => {
		const reader = new FileReader();

		reader.onload = async (event: any) => {
			const image = new Image();
			image.src = event.target.result as string;

			image.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;

				const ctx: any = canvas.getContext('2d');
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

				// Convert canvas to Blob and create a new File object
				canvas.toBlob(
					(blob: any) => {
						const compressedFile = new File([blob], file.name, {
							type: file.type,
							lastModified: Date.now()
						});
						resolve(compressedFile);
					},
					file.type,
					quality
				); // Use the provided quality parameter
			};
		};

		reader.readAsDataURL(file);
	});
};
export const compressBlobImage = async (
	file: Blob,
	width: number,
	height: number,
	quality: number
): Promise<Blob> => {
	return new Promise<Blob>((resolve) => {
		const image = new Image();

		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;

			const ctx: any = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

			canvas.toBlob(
				(blob: any) => {
					resolve(blob);
				},
				'image/jpeg',
				quality
			);
		};

		image.src = URL.createObjectURL(file);
	});
};

export async function processCreditCardPayment() {
	// Implement credit card payment handling using Stripe or other payment gateway
	// Return the payment result or handle the payment response as needed
	return { success: true, message: 'Credit Card Payment Successful' };
}

export async function processPayPalPayment() {
	// Implement PayPal payment handling
	// Return the payment result or handle the payment response as needed
	return { success: true, message: 'PayPal Payment Successful' };
}
// Function to handle Vipps payment
export async function processVippsPayment() {
	try {
		const paymentDataResponse = await fetch('/api/createPayment');
		const paymentData = await paymentDataResponse.json(); // Assuming the response body is JSON

		// You should redirect the user to the provided redirect URL to proceed with the Vipps payment
		window.location.href = paymentData.redirectUrl;
		return paymentData;
	} catch (error: any) {
		console.error('Error processing Vipps payment:', error.message);
		// Handle payment failure
		return { success: false, message: 'Error processing Vipps payment' };
	}
}

// function that generates the manga pages for the sitemap
export const genMangaPosts = async (page: number) => {
	const mangaPosts: any = [];
	const url = import.meta.env.VITE_HOST_URL + `/api/manga?page=${page}`;

	const response = await fetch(url, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		}
	});

	const data = await response.json();
	const mangas = data.mangas;

	mangas.forEach((manga: any) => {
		mangaPosts.push({
			url: manga.src,
			image: `${'/api' + manga.img}`,
			title: manga.title,
			description: manga.description
		});
	});

	return mangaPosts;
};

// Function to create reading progress. but first create the manga and the chapter
export const readingProgress = async (data: any) => {
	// function to update the reading status of the manga on the user record in the users collection, if the manga is not in the user record, add it, else update the reading status of the manga and the reading progress
	const genreIds: any = [];
	const authorIds: any = [];
	async function createOrUpdateReadingProgress(
		mangaId: string,
		chapterId: string,
		currentChapterIndex: number,
		totalChapters: number
	) {
		// Check if the user is logged in
		if (pb.authStore.isValid) {
			const userId = pb.authStore.model?.id;

			// Check if the manga already exists in the user record
			const existingProgressList = await getPocketbase('reading_progress', {
				filter: `user="${userId}" && manga="${mangaId}"`
			});

			if (existingProgressList.items.length === 0) {
				// If the manga doesn't exist, create it
				const pbData = {
					user: `${userId}`, // This is the user id, not the username
					manga: `${mangaId}`, // This is the manga id, not the manga title
					currentChapter: `${chapterId}`,
					currentChapterIndex: currentChapterIndex,
					totalChapters: totalChapters
				};
				await postPocketbase('reading_progress', pbData);
			} else {
				// If a reading progress record exists, update the current chapter
				const readingProgressId = existingProgressList.items[0].id;
				const pbdata = {
					currentChapter: `${chapterId}`,
					currentChapterIndex: currentChapterIndex,
					totalChapters: totalChapters
				};
				await pb.collection('reading_progress').update(readingProgressId, pbdata);
			}
		}
	}

	async function search(entry: any) {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_HOST_URL}/api/manga/search?word=${entry.name}&page=${1}`
			);

			const data = await response.json();
			const mangas = data.mangas;
			return mangas[0];
		} catch (error) {
			console.error(error);
		}
	}

	async function chaptersIndex(chapterid: string, id: string) {
		const url = `/manga/${id}/chapter-${chapterid}`;

		try {
			const response = await fetch(
				import.meta.env.VITE_HOST_URL + `/api/manga/${id}/${chapterid}?url=${url}`
			);
			const data = await response.json();

			const currentChapterIndex = data.chapters?.findIndex(
				(chapter: any) => chapter.value === url?.replace('/manga', '')
			);
			const totalChapters = data.chapters?.length;
			return { currentChapterIndex, totalChapters };
		} catch (error) {
			console.error(error);
			return { currentChapterIndex: 1, totalChapters: 1 };
		}
	}

	async function createRecord(entry: any) {
		const manga = await search(entry);
		// if the user is logged in, send the chapter data to pocketbase
		if (pb.authStore.isValid) {
			// Check if the manga already exists using some unique identifier, for example, the title
			const existingChapterList = await getPocketbase('Chapters', {
				filter: `src="${manga?.src}"`
			});

			if (existingChapterList.items.length === 0) {
				// Check if the manga already exists using some unique identifier, for example, the title
				const existingMangaList = await getPocketbase('mangas', {
					filter: `sourceid~"${manga?.mangaParkId}"`
				});
				// If a manga record doesn't exist, create it
				if (existingMangaList.items.length === 0) {
					const urlmanga = `/manga/${manga?.mangaParkId}`;

					const responsemanga = await fetch(
						import.meta.env.VITE_HOST_URL + `/api/manga/${manga?.mangaParkId}?url=${urlmanga}`
					);
					const datamanga = await responsemanga.json();

					// Manga doesn't exist, create it
					for (let i = 0; i < datamanga.author.length; i++) {
						const genreList = await getPocketbase('genres', {
							filter: `name="${datamanga.author[i]}"`
						});

						if (genreList.items.length === 0) {
							const createdAuthor = await postPocketbase('author', {
								name: `${datamanga.author[i]}`
							});

							authorIds.push(createdAuthor.id);
						} else {
							genreIds.push(genreList.items[0].id);
						}
					}

					// create the manga datamanga to send to pocketbase
					const pbDataManga = {
						title: datamanga.title,
						description: datamanga.description,
						img: import.meta.env.VITE_HOST_URL + '/api' + datamanga.img,
						updated: datamanga.lastUpdated,
						views: datamanga.views,
						latestChapter: datamanga.episodes[0].chapterTitle,
						sourceid: manga?.mangaParkId,
						genres: genreIds,
						authors: authorIds,
						src: manga?.src
					};
					const mangaRes = await postPocketbase('mangas', pbDataManga);
					// create the chapter data to send to pocketbase
					const pbData = {
						title: entry.name,
						chapterId: `chapter-${entry.ch ? entry.ch : 1}`,
						src:
							import.meta.env.VITE_HOST_URL +
							`/manga/${manga?.mangaParkId}/chapter-${entry.ch ? entry.ch : 1}`,
						manga: mangaRes.id
					};
					const chapterRes = await postPocketbase('Chapters', pbData);

					const { currentChapterIndex, totalChapters } = await chaptersIndex(
						entry.ch ? entry.ch : 1,
						manga?.mangaParkId
					);
					// Call the function to create or update the reading progress
					await createOrUpdateReadingProgress(
						chapterRes.manga,
						chapterRes.id,
						currentChapterIndex,
						totalChapters
					);
				} else {
					// create the chapter data to send to pocketbase
					const pbData = {
						title: entry.name,
						chapterId: `chapter-${entry.ch ? entry.ch : 1}`,
						src:
							import.meta.env.VITE_HOST_URL +
							`/manga/${manga?.mangaParkId}/chapter-${entry.ch ? entry.ch : 1}`,
						manga: existingMangaList.items[0].id
					};
					const chapterRes = await postPocketbase('Chapters', pbData);

					const { currentChapterIndex, totalChapters } = await chaptersIndex(
						entry.ch ? entry.ch : 1,
						manga?.mangaParkId
					);
					// Call the function to create or update the reading progress
					await createOrUpdateReadingProgress(
						chapterRes.manga,
						chapterRes.id,
						currentChapterIndex,
						totalChapters
					);
				}
			} else {
				const { currentChapterIndex, totalChapters } = await chaptersIndex(
					entry.ch ? entry.ch : 1,
					manga?.mangaParkId
				);
				// Call the function to create or update the reading progress
				await createOrUpdateReadingProgress(
					existingChapterList.items[0].manga,
					existingChapterList.items[0].id,
					currentChapterIndex,
					totalChapters
				);
			}
		}
	}

	for (let i = 0; i < data.entries.length; i++) {
		await createRecord(data.entries[i]);
	}
};
