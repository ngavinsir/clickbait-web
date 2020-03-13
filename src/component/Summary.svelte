<div class="flex flex-col items-center w-full max-w-screen-md">
    {#each sentences as sentence, i (i)}
        <div 
            class={selected.includes(i) ? "sentence border-white border-2 hover:bg-dark-7" : "sentence border-2 border-transparent"}
            on:click={() => toggleSelect(i)}
        >
            <span class="numbering">{i+1}</span>
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

<style type="text/postcss">
.numbering {
    @apply w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full bg-accent-7 text-white flex-shrink-0;
}
</style>