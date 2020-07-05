<script>
	import Axios from "./component/Axios.svelte";
	import Notification from "./component/Notification.svelte";
	import Modal from './component/Modal.svelte';
	import Landing from './pages/index.svelte';
	import App from './pages/app.svelte';
	import { landing } from "./stores.js";

</script>

<svelte:head>
	<link rel="dns-prefetch" href="//fonts.googleapis.com">
  	<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
  	<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<Modal><Notification><Axios>
	{#if $landing}
		<Landing />
	{:else}
		<App />
	{/if}
</Axios></Notification></Modal>
