<div class={`flex items-center ${wrapperClass(data.label.value)} rounded-lg shadow-xl px-4 py-4`}>
    <div class="flex flex-col flex-grow">
        <span class="value text-left flex-grow leading-none">{data.article.headline}</span>
        <span 
            class="text-accent-5 mt-2 font-bold text-sm cursor-pointer"
            on:click={showSummary}
        >
            SHOW SUMMARY
        </span>
    </div>
    <svg class="flex-shrink-0 cursor-pointer ml-4 group" on:click={() => dispatch('delete', data.label.id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class={`stroke-current ${deleteIconClass(data.label.value)}`} d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</div>

<script>
    import axios from "axios";
    import { history, jwt, type } from "../../stores.js";
    import { createEventDispatcher } from 'svelte';
    import { getContext } from 'svelte';
    import ContentSummary from './ContentSummary.svelte';

    const { open } = getContext('simple-modal');
	const dispatch = createEventDispatcher();

    export let data;

    function wrapperClass(value) {
        return value == "Clickbait" ? "bg-red-300 text-red-900" : "bg-dark-7 text-white";
    }

    function deleteIconClass(value) {
        return value == "Clickbait" ? 
            "text-red-900 group-hover:text-red-700" : 
            "text-gray-300 group-hover:text-gray-100";
    }

    function showSummary() {
        open(ContentSummary, { summary: data.label.value }, { 
            closeButton: false, 
            styleWindow: {
                backgroundColor: '#272727'
            } 
        });
    };
</script>

<style type="text/postcss">
svg {
    max-width: 24px;
}
</style>