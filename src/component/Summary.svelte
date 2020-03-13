<div class="flex flex-col items-center w-full max-w-screen-md mt-8">
    {#each sentences as sentence, i (i)}
        <div 
            class={selected.includes(i) ? "sentence border-white border-2 bg-dark-8 hover:bg-dark-8" : "sentence border-2 border-transparent"}
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
    <div class="footer">
        <span class="text-white sm:ml-4 mr-auto text-sm sm:text-base">{selected.length} selected</span>
        <span 
            class="text-white mr-4 font-bold text-sm cursor-pointer"
            on:click={() => selected = []} 
        >
            RESET
        </span>
        <button 
            class="bt w-24 sm:w-32 text-base sm:mx-6 flex items-center justify-center" 
            disabled={!selected.length || loading}
            on:click={submit}
        >
            Submit
        </button>
    </div>
{/if}

<script>
    import axios from "axios";
    import { article, jwt, history } from "../stores.js";
    import config from "../config.js";

    let selected = [];
    let loading = false;

    $: sentences = $article && $article.content ? $article.content.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|") : [];

    function isSelected(i) {
        return selected.includes(i);
    }

    function toggleSelect(i) {
        if (isSelected(i)) selected = selected.filter(s => s != i);
        else selected = [...selected, i];
    }

    async function submit() {
        loading = true;
        const summary = selected.map(i => sentences[i]).join(" ");
        const url = `${config.baseUrl}/labeling/summary`;
        const data = {
            value: summary,
            article_id: $article.id
        };
        try {
            const { data: { error, label_id, new_article } } = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${$jwt}`
                }
            })
            if(!error)  {
                selected = [];
                history.add({ 
                    id: label_id,
                    article: $article,
                    label_value: summary,
                    label_updated_at: new Date().toISOString()
                })
                $article = new_article;
            }
        } catch (e) {
            // handle label summary error
        } finally {
            loading = false;
        }
    }
</script>