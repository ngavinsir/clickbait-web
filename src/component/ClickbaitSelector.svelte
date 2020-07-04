<div class="flex flex-col items-center font-sans">
    <span class="text-white text-lg font-bold">Pilih kata kunci clickbait</span>
    <span class="text-dark-1 text-sm">minimal 1, maximal 2</span>
    <div class="flex flex-row justify-center flex-wrap mt-4">
        {#each tokens as token}
            <span 
                class="px-2 py-1 m-1 font-bold text-accent-3 text-xl cursor-pointer"
                class:selected={selected.includes(token)}
                on:click={toggleSelect(token)}
            >
                {token}
            </span>
        {/each}
    </div>
    <button 
        class="mt-8 bt gray self-end px-6"
        disabled={selected.length < 1 || selected.length > 2}
        on:click={() =>
            $modal = {
                event: 'clickbaitSelector',
                payload: selected
            }
        }
    >
        Send
    </button>
</div>

<style type="text/postcss">
    .selected {
        @apply bg-accent-3 text-dark-9 rounded-lg;
    }
</style>

<script>
    import { modal } from "../stores.js";

    export let tokens;
    
    let selected = []

    function toggleSelect(token) {
        if(selected.includes(token)) {
            selected = selected.filter(s => s != token) 
        } else {
            selected = [...selected, token]
        }
    }
</script>