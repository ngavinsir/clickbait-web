<script>
	import Modal from 'svelte-simple-modal';
	import Axios from "./component/Axios.svelte";
	import Auth from "./component/Auth.svelte";
	import Article from "./component/Article.svelte";
	import Clickbait from "./component/Clickbait.svelte";
	import Summary from "./component/Summary.svelte";
	import Tailwindcss from './component/Tailwindcss.svelte';
	import History from "./component/History.svelte";
	import { jwt, type } from "./stores.js";
</script>

<Modal><Axios>
	<main>
		<div class="min-w-screen min-h-screen flex flex-col items-center">
			<Auth />
			{#if $jwt}
				<div class="flex flex-col items-center mt-20 w-11/12 max-w-4xl">
					<Article />
					{#if $type == "clickbait"}
						<Clickbait />
					{:else if $type == "summary"}
						<Summary />
					{/if}
				</div>
				<div class="mt-8 w-11/12 max-w-screen-md">
					<History />
				</div>
			{/if}
		</div>

		<Tailwindcss />
	</main>
</Axios></Modal>