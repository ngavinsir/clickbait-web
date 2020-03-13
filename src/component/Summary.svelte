<div class="flex flex-col items-center w-full max-w-screen-md">
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