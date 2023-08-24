import PocketBase from 'pocketbase';
import { authData } from '$lib/utils/stores';
import { goto } from '$app/navigation';

export const pb = new PocketBase(`${import.meta.env.VITE_PB_URL}`);
export const pb2 = new PocketBase(`${import.meta.env.VITE_PB_API_2}`);

export const authPocketbase = async (user: string, password: string) => {
	const res = await pb.collection('users').authWithPassword(user, password);
	await pb2.collection('users').authWithPassword(user, password);
	authData.set(pb.authStore.model);

	goto('/');
	if (!pb.authStore.isValid) {
		throw { status: pb.authStore.isValid, message: pb.authStore.token };
	} else {
		return res;
	}
};

export const logoutPocketbase = async () => {
	pb.authStore.clear();
	pb2.authStore.clear();
	authData.set({});

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

	// (optional) send an email verification request and chat using the new pb2 api
	const data2 = {
		id: res.id,
		username: data.username,
		email: data.email,
		emailVisibility: data.emailVisibility,
		password: data.password,
		passwordConfirm: data.passwordConfirm
	};

	await pb2.collection('users').create(data2);

	// (optional) send an email verification request
	await pb2.collection('users').requestVerification(data.email);

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
	await pb2.admins.authWithPassword(user, password);
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

export async function fetchMenuItems(menu: string) {
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

// export const getPocketbase = async (endpoint: string) => {
// 	const response = await fetch(`${import.meta.env.VITE_PB_URL}/api/collections/` + endpoint);
// 	const isJson = response.headers.get('content-type')?.includes('application/json');
// 	const res = isJson ? await response.json() : await response.text();

// 	if (response?.status > 399) {
// 		throw { status: response.status, message: response.statusText };
// 	} else {
// 		return res;
// 	}
// };

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
	await pb2.collection(collection).update(id, data);
	return response;
};

export const patchPocketbase1only = async (collection: string, id: string, data: any) => {
	const response = await pb.collection(collection).update(id, data);

	return response;
};

export const getImage = async (url: string, width: number, height: number) => {
	const response = await fetch(url);
	if (response.ok) {
		const originalImageBlob = await response.blob();
		const compressedImageBlob = await compressImage(originalImageBlob, width, height, 1); // 1 = 100% quality (no compression) - change as needed, e.g 0 = 0% quality (full compression)
		return URL.createObjectURL(compressedImageBlob);
	}

	throw new Error('Failed to fetch image');
};

export const compressImage = async (
	file: any,
	width: number,
	height: number,
	quality: number
): Promise<File> => {
	return new Promise<File>((resolve, reject) => {
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
