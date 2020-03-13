<div class={`flex items-center ${even ? "bg-dark-7 text-white" : "bg-dark-3 text-black"} rounded-lg shadow-xl px-4 py-4`}>
    <span class="value text-left w-full leading-none">{label.article.headline}</span>
    <span 
        class={`label w-full text-center font-bold leading-none text-${even ? "dark-1" : "dark-9"}`}
    >
        {label.label_value.toUpperCase()}
    </span>
    <svg class="cursor-pointer ml-4 group" on:click={() => dispatch('delete', label.id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="stroke-current text-gray-300 group-hover:text-white" d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</div>

<script>
    import axios from "axios";
    import { history, jwt, type } from "../stores.js";
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let label;
    export let even = false;
</script>

<style type="text/postcss">
.value {
    flex: 7;
}
.label {
    flex: 2;
}
svg {
    flex: 1;
    max-width: 24px;
}
</style>