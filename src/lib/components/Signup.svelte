<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPocketbaseUser } from '$lib/utils/api';

	let username = '';
	let password = '';
	let email = '';
	let passwordConfirm = '';

	const data = {
		username,
		email,
		emailVisibility: true,
		password,
		passwordConfirm
	};

	async function signup() {
		try {
			// create pocketbase user
			await createPocketbaseUser(data);
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

			<input
				name="username"
				bind:value={data.username}
				minlength="3"
				maxlength="16"
				class="input input-bordered"
			/>
		</label>
	</div>

	<div class="form-control">
		<label class="input-group input-group-vertical">
			<span class="bg-primary">Password</span>

			<input
				name="password"
				bind:value={data.password}
				minlength="8"
				type="password"
				class="input input-bordered"
			/>
		</label>
	</div>

	<div class="form-control">
		<label class="input-group input-group-vertical">
			<span class="bg-primary">Confirm Password</span>
			<input
				name="passwordConfirm"
				bind:value={data.passwordConfirm}
				minlength="8"
				type="password"
				class="input input-bordered"
			/>
		</label>
	</div>

	<div class="form-control">
		<label class="input-group input-group-vertical">
			<span class="bg-primary">Your Email</span>
			<input
				bind:value={data.email}
				type="email"
				placeholder="info@site.com"
				class="input input-bordered"
			/>
		</label>
	</div>

	<a href="/login" class="text-blue-600 hover:underline block">Already registered? Login</a>
	<button on:click={signup} class="btn btn-primary w-full">Sign Up</button>
</div>
