<script>
	import axios from "axios";
	import Auth from "./component/Auth.svelte";
	import Article from "./component/Article.svelte";
	import Clickbait from "./component/Clickbait.svelte";
	import Summary from "./component/Summary.svelte";
	import Tailwindcss from './component/Tailwindcss.svelte';
	import History from "./component/History.svelte";
	import { article, jwt, type } from "./stores.js";
	import config from "./config.js";

    $: getArticle($type);

    export async function getArticle(type) {
		if(!$jwt) return;
        const url = `${config.baseUrl}/article/random/${type}`;
        try {
            const { data, data: { error } } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${$jwt}`
                }
            })
            $article = !error ? data : null;
        } catch (e) {
            // handle get article error
        }
    }
</script>

<main>
	<div class="min-w-screen min-h-screen flex flex-col items-center">
		<Auth />
		<div class="flex flex-col items-center mt-20 w-11/12 max-w-4xl">
			<Article on:skip={() => getArticle("clickbait")}/>
			{#if $type == "clickbait"}
				<Clickbait />
			{:else if $type == "summary"}
				<Summary />
			{/if}
		</div>
		<div class="mt-24 w-11/12 max-w-screen-md">
			<History />
		</div>
	</div>

	<Tailwindcss />
</main>