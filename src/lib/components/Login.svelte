<script lang="ts">
	import { authPocketbase, pb } from '$lib/utils/api';

	let username: string;
	let password: string;
	let passwordError: boolean;

	function checkPassword() {
		passwordError = password.length < 8;
	}

	async function login() {
		if (passwordError) {
			return;
		}

		try {
			await authPocketbase(username, password);
			window.location.reload();
		} catch (err: any) {
			alert(err.message);
		}
	}
</script>

{#if pb.authStore.isValid}
	<div class="relative flex flex-col items-center justify-center h-screen overflow-hidden">
		<div class="w-full p-6 bg-base-200 border-t-4 rounded-md shadow-md border-top lg:max-w-lg">
			<h1 class="text-3xl font-semibold text-center">You are already logged in</h1>
			<form class="space-y-4">
				<button on:click={() => window.history.back()} class="btn btn-block btn-neutral"
					>Go back</button
				>
			</form>
		</div>
	</div>
{:else}
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
						placeholder="Username"
						bind:value={username}
						minlength="3"
						class="w-full input input-bordered"
					/>
				</div>
				<div>
					<label class="label" for="password">
						<span class="text-base label-text">Password</span>
					</label>

					<input
						name="password"
						bind:value={password}
						placeholder="Enter Password"
						minlength="8"
						type="password"
						class="w-full input input-bordered"
						on:submit={checkPassword}
					/>
				</div>
				<a href="/signup" class=" link link-hover">Not registered? Signup</a>
				<div>
					<button on:click={login} class="btn btn-block">Login</button>
				</div>
			</form>
		</div>
	</div>
{/if}
