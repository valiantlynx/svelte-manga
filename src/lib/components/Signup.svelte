<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPocketbaseUser } from '$lib/utils/api';

	let username = '';
	let password = '';
	let email = '';

	const data = {
		username,
		email,
		emailVisibility: true,
		password,
		passwordConfirm: password
	};

	async function signup() {
		try {
			// create pocketbase user
			await createPocketbaseUser(data);
			await goto('/');
			window.location.reload();
		} catch (err: any) {
			alert(err.message);
		}
	}
</script>

<div class="relative flex flex-col items-center justify-center h-screen overflow-hidden">
	<div class="w-full p-6 bg-base-200 border-t-4 rounded-md shadow-md border-top lg:max-w-lg">
		<h1 class="text-3xl font-semibold text-center">AnimeVariant</h1>
		<form class="space-y-4">
			<div>
				<label class="label" for="username">
					<span class="text-base label-text">Username</span>
				</label>
				<input
					type="text"
					name="username"
					placeholder="Username"
					bind:value={data.username}
					minlength="3"
					maxlength="16"
					class="input input-bordered w-full"
				/>
			</div>
			<div>
				<label class="label" for="password">
					<span class="text-base label-text">Password</span>
				</label>

				<input
					type="password"
					name="password"
					placeholder="Enter Password"
					bind:value={data.password}
					minlength="8"
					class="input input-bordered w-full"
				/>
			</div>
			<div>
				<label class="label" for="password">
					<span class="text-base label-text">Confirm Password</span>
				</label>

				<input
					type="password"
					name="passwordConfirm"
					placeholder="Enter Password Again"
					bind:value={data.passwordConfirm}
					minlength="8"
					class="input input-bordered w-full"
				/>
			</div>
			<div>
				<label class="label" for="email">
					<span class="text-base label-text">Email</span>
				</label>
				<input
					bind:value={data.email}
					type="email"
					placeholder="info@site.com"
					class="input input-bordered w-full"
				/>
			</div>
			<a href="/login" class=" link link-hover">Already registered? Login</a>
			<div>
				<button on:click={signup} class="btn btn-block">Sign Up</button>
			</div>
		</form>
	</div>
</div>
