<script>
	import Auth from "./component/Auth.svelte";
	import Headline from "./component/Headline.svelte"
	import Tailwindcss from './component/Tailwindcss.svelte';
	import History from "./component/History.svelte"
</script>

<main>
	<div class="min-w-screen min-h-screen flex flex-col items-center">
		<Auth />
		<div class="mt-24 w-11/12 max-w-4xl">
			<Headline />
		</div>
		<div class="mt-24 w-11/12 max-w-screen-md">
			<History />
		</div>
	</div>

	<Tailwindcss />
</main>