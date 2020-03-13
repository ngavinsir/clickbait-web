<div class="flex flex-col items-center w-full max-w-screen-md mt-8">
    {#each sentences as sentence, i (i)}
        <div 
            class={selected.includes(i) ? "sentence border-white border-2 bg-dark-8 hover:bg-dark-8" : "sentence border-2 border-transparent"}
            on:click={() => toggleSelect(i)}
        >
            <span class={selected.includes(i) ? "numbering bg-blue-500" : "numbering"}>
                {selected.includes(i) ? selected.indexOf(i)+1 : i+1}
            </span>
            <span class="ml-4 text-gray-100 text-lg">{sentence}</span>
        </div>
    {/each}
</div>

{#if selected.length}
    <div class="fixed bottom-0 border-t-2 border-dark-7 bg-dark-8 w-screen p-4 sm:px-6 flex items-center justify-end z-20">
        <span class="text-white sm:ml-4 mr-auto text-sm sm:text-base">{selected.length} selected</span>
        <span 
            class="text-white mr-4 font-bold text-sm cursor-pointer"
            on:click={() => selected = []} 
        >
            RESET
        </span>
        <button 
            class="bt w-24 sm:w-32 text-base sm:mx-6 flex items-center justify-center" 
            disabled={!selected.length}
        >
            Submit
        </button>
    </div>
{/if}

<script>
    import { article } from "../stores.js";

    let selected = [];

    $: sentences = $article && $article.content ? $article.content.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|") : [];

    function isSelected(i) {
        return selected.includes(i);
    }

    function toggleSelect(i) {
        if (isSelected(i)) selected = selected.filter(s => s != i);
        else selected = [...selected, i];
    }
</script>