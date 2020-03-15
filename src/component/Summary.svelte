<div class="flex flex-col items-center w-full max-w-screen-md">
    {#if sentences.length && renderSentenceCount}
        <span
            in:fly={{duration:150, y:150}}
            out:fly={{duration:150, y:150}}
            class="text-white text-sm sm:text-base self-end mr-2 mb-2 mt-8"
        >
            {sentences.length} sentences
        </span>
    {/if}
    {#each sentences as sentence, i ($article.id + i)}
        <div
            in:fly={{duration:150, y:150, delay: 150}}
            out:fly={{duration:150, y:150}}
            class={selected.includes(i) ? "sentence border-white border-2 bg-dark-8 sm:hover:bg-dark-8" : "sentence border-2 border-transparent"}
            on:click={() => toggleSelect(i)}
        >
            <span class={selected.includes(i) ? "numbering bg-blue-500" : "numbering"}>
                {selected.includes(i) ? selected.indexOf(i)+1 : i+1}
            </span>
            <span class="ml-4 text-gray-100 sm:text-lg">{sentence}</span>
        </div>
    {/each}
</div>

{#if selected.length}
    <div transition:fly={{duration:150, y:75}} class="footer">
        <span class="text-white sm:ml-4 mr-auto text-sm sm:text-base">{selected.length} selected</span>
        <span 
            class="text-white mr-4 font-bold text-sm cursor-pointer"
            on:click={() => selected = []} 
        >
            RESET
        </span>
        <Bt 
            customClass="w-24 sm:w-32 text-base my-1 sm:mx-6" 
            on:click={submit}
            spinnerColor="#000"
            disabled={!selected.length || loading}
            {loading}
            value="Submit"
        />
    </div>
{/if}

<script>
    import Bt from "./Button.svelte";
    import { article, history } from "../stores.js";
    import { fly } from "svelte/transition";
    import { tick, getContext } from 'svelte';

    const { axios } = getContext("axios");

    let selected = [];
    let sentences = [];
    let loading = false;
    let renderSentenceCount = true;

    $: updateContent($article);

    async function updateContent(article) {
        renderSentenceCount = false;
        selected = [];
        await tick();
        sentences = article && article.content ? article.content.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|") : [];
        renderSentenceCount = true;
    }

    function toggleSelect(i) {
        if (selected.includes(i)) selected = selected.filter(s => s != i);
        else selected = [...selected, i];
    }

    async function submit() {
        loading = true;
        const summary = selected.map(i => sentences[i]).join(" ");
        const url = `/labeling/summary`;
        const data = {
            value: summary,
            article_id: $article.id
        };
        try {
            const { data: { error, label_id, new_article } } = await axios.post(url, data)
            if(!error)  {
                selected = [];
                history.add({ 
                    label: {
                        id: label_id,
                        value: summary,
                        updated_at: new Date().toISOString()
                    },
                    article: $article,
                })
                $article = new_article;
            }
        } catch (e) {
            console.log(e);
            // handle label summary error
        } finally {
            loading = false;
        }
    }
</script>