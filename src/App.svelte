<script>
	import axios from "axios";
	import Auth from "./component/Auth.svelte";
	import Article from "./component/Article.svelte";
	import Clickbait from "./component/Clickbait.svelte";
	import Tailwindcss from './component/Tailwindcss.svelte';
	import History from "./component/History.svelte";
	import { article, jwt } from "./stores.js";
	import config from "./config.js";

    let type = "clickbait";

    $: getArticle(type);

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
		<div class="flex flex-col items-center mt-24 w-11/12 max-w-4xl">
			<Article {type} />
			<Clickbait {type} on:skip={() => getArticle("clickbait")}/>
		</div>
		<div class="mt-24 w-11/12 max-w-screen-md">
			<History {type}/>
		</div>
	</div>

	<Tailwindcss />
</main>