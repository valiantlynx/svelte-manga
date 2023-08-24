<script lang="ts">
	import { goto } from '$app/navigation';
	import { authPocketbase } from '$lib/utils/api';

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
			goto('/');
		} catch (err: any) {
			alert(err.message);
		}
	}
</script>

<div class="p-4 space-y-4">
	<div class="form-control">
		<label class="input-group input-group-vertical">
			<span class="bg-primary">Username</span>
			<input name="username" bind:value={username} minlength="3" class="input input-bordered" />
		</label>
	</div>

	<div class="form-control">
		<label class="input-group input-group-vertical">
			<span class="bg-primary">Password</span>
			{#if !passwordError}
				<input
					name="password"
					bind:value={password}
					minlength="8"
					type="password"
					class="input input-bordered"
					class:input-error={passwordError}
					on:input={checkPassword}
				/>
			{:else}
				<input
					name="password"
					bind:value={password}
					minlength="8"
					type="password"
					class="input input-bordered input-error w-full"
					class:input-bordered={passwordError}
					on:input={checkPassword}
				/>
				<label class="label" for="password">
					<span class="label-text-alt text-error">Password must be at least 8 characters long.</span
					>
				</label>
			{/if}
		</label>
	</div>

	<a href="/signup" class="text-blue-600 hover:underline block">Not registered? Signup</a>
	<button on:click={login} class="btn btn-primary w-full">login</button>
</div>
