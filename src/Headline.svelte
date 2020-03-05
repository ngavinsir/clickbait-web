<script>
    import axios from "axios";
    import { jwt } from "./stores.js";

    let headline = null;

    $: getHeadline($jwt);

    const baseUrl = "http://localhost:4040";

    async function getHeadline(jwt) {
        if(!$jwt) return;
        const url = `${baseUrl}/headline/random`;
        const { data, data: { error } } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${$jwt}`
            }
        })
        headline = !error ? data : null;
    }

    async function sendLabel(label) {
        const url = `${baseUrl}/clickbait`;
        const data = {
            value: label,
            headline_id: headline.id
        };
        const { data: newHeadline, data: { error } } = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${$jwt}`
            }
        })
        headline = !error ? newHeadline : null;
    }

</script>

{#if $jwt}
    <div class="flex flex-col items-center w-full">
        <span class={headline ? "headline" : "no-headline"}>{headline ? headline.value : "No headline"}</span>
        <button class="w-48 text-accent-1 text-base sm:text-xl focus:outline-none" on:click={getHeadline}>
            another headline
        </button>
        <div class="flex content-around mt-12">
            <button 
                class="bt white w-32 sm:w-40 m-2 sm:mx-6 mt-10" 
                on:click={() => sendLabel("NotClickbait")} 
                disabled={!headline}
            >
                Not Clickbait
            </button>
            <button class="bt w-32 sm:w-40 m-2 sm:mx-6 mt-10" on:click={() => sendLabel("Clickbait")} disabled={!headline}>
                Clickbait
            </button>
        </div>
    </div>
{:else}
    <h1>Login first</h1>
{/if}

<style type="text/postcss">
.headline {
    @apply text-gray-200 text-4xl text-center;
}

.no-headline {
    @apply text-red-400 text-4xl text-center;
}

@screen sm {
    .headline {
        @apply text-6xl;
    }
}
</style>