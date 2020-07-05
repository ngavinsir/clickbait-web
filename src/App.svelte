<script>
	import { Router } from "@sveltech/routify";
	import { routes } from "@sveltech/routify/tmp/routes";
	import Axios from "./component/Axios.svelte";
	import Notification from "./component/Notification.svelte";
	import Modal from './component/Modal.svelte';
</script>

<svelte:head>
	<link rel="dns-prefetch" href="//fonts.googleapis.com">
  	<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
  	<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<Modal><Notification><Axios>
	<Router {routes} />
</Axios></Notification></Modal>
