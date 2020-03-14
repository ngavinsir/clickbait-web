<script>
	import Modal from './component/Modal.svelte';
	import Axios from "./component/Axios.svelte";
	import Auth from "./component/Auth.svelte";
	import Article from "./component/Article.svelte";
	import Clickbait from "./component/Clickbait.svelte";
	import Summary from "./component/Summary.svelte";
	import Tailwindcss from './component/Tailwindcss.svelte';
	import History from "./component/History.svelte";
	import { jwt, type, history } from "./stores.js";
</script>

<main>
	<div class="min-w-screen min-h-full flex flex-col items-center font-sans leading-normal py-20">
		<Auth />
		{#if $jwt}
			<Axios><Modal>
				<div class="flex flex-col items-center w-11/12 max-w-4xl">
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
			</Modal></Axios>
		{/if}
	</div>

	<Tailwindcss />
</main>
