<script>
	
	import Auth from "../component/Auth.svelte";
	import Article from "../component/Article.svelte";
	import Clickbait from "../component/Clickbait.svelte";
	import Summary from "../component/Summary.svelte";
	import Tailwindcss from '../component/Tailwindcss.svelte';
	import History from "../component/History.svelte";
  	
  	import Onboarding from "../component/onboarding/Onboarding.svelte";
    import { jwt, type, history } from "../stores.js";
    
    let article;

	$: component = $type === "clickbait" ? Clickbait : $type === "summary" ? Summary : null;
</script>

<main>
    <div class="flex flex-col items-center min-h-full font-sans leading-normal min-w-screen">
        <Auth />
        {#if $jwt}
            <Onboarding />
            <div class="flex flex-col items-center w-11/12 max-w-4xl pt-20 sm:pt-24">
                <Article bind:this={article} />
                <svelte:component this={component} on:retry={_ => article.getArticle()} />
            </div>
            <div class="w-11/12 mt-8 max-w-screen-md pb-40">
                <History />
            </div>
        {/if}
    </div>

	<Tailwindcss />
</main>
