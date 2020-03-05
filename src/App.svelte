<script>
	import Auth from "./Auth.svelte";
	import Headline from "./Headline.svelte"
	import Tailwindcss from './Tailwindcss.svelte';
</script>

<main>
	<div class="min-w-screen min-h-screen flex flex-col items-center">
		<Auth />
		<div class="mt-24 w-11/12 max-w-2xl">
			<Headline />
		</div>
	</div>

	<Tailwindcss />
</main>