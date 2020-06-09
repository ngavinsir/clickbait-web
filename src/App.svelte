<script>
	import Modal from './component/Modal.svelte';
	import Axios from "./component/Axios.svelte";
	import Auth from "./component/Auth.svelte";
	import Article from "./component/Article.svelte";
	import Clickbait from "./component/Clickbait.svelte";
	import Summary from "./component/Summary.svelte";
	import Tailwindcss from './component/Tailwindcss.svelte';
	import History from "./component/History.svelte";
  import Notification from "./component/Notification.svelte";
  import Onboarding from "./component/onboarding/Onboarding.svelte";
	import { jwt, type, history } from "./stores.js";

	$: component = $type === "clickbait" ? Clickbait : $type === "summary" ? Summary : null;
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<main>
	<div class="flex flex-col items-center min-h-full pt-20 pb-48 font-sans leading-normal min-w-screen">
		<Auth />
		{#if $jwt}
      <Notification><Axios><Modal>
        <Onboarding />
				<div class="flex flex-col items-center w-11/12 max-w-4xl">
					<Article />
					<svelte:component this={component} />
				</div>
				<div class="w-11/12 mt-8 max-w-screen-md">
					<History />
				</div>
      </Modal></Axios></Notification>
		{/if}
	</div>

	<Tailwindcss />
</main>
