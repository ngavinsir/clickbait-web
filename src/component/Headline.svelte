<script>
    import axios from "axios";
    import { jwt, history } from "../stores.js";

    let headline = null;
    let loading = false;

    $: getHeadline($jwt);

    const baseUrl = "http://localhost:4040";

    async function getHeadline(jwt) {
        if(!$jwt) return;
        loading = true;
        const url = `${baseUrl}/headline/random`;
        try {
            const { data, data: { error } } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${$jwt}`
                }
            })
            headline = !error ? data : null;
        } catch (e) {
            // handle get headline error
        } finally {
            loading = false;
        }
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
        if(!error)  { 
            history.add({ 
                id: headline.id,
                headline_value: headline.value,
                label_value: label,
                label_updated_at: new Date().toISOString()
            })
        }
        headline = !error ? newHeadline : null;
    }

</script>


<div class="flex flex-col items-center w-full">
    {#if $jwt}
        <svg class={`${loading ? 'rotate' : ''} self-end opacity-75 cursor-pointer`} on:click={getHeadline} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="#63E0A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="headline leading-tight">{headline ? headline.value : "No headline"}</span>
        <div class="flex content-around mt-8">
            <button 
                class="bt white w-32 sm:w-40 m-2 sm:mx-6" 
                on:click={() => sendLabel("NotClickbait")} 
                disabled={!headline}
            >
                Not Clickbait
            </button>
            <button class="bt w-32 sm:w-40 m-2 sm:mx-6" on:click={() => sendLabel("Clickbait")} disabled={!headline}>
                Clickbait
            </button>
        </div>
    {:else}
        <h1 class="text-xl text-accent-5 font-semibold">login first</h1>
    {/if}
</div>

    

<style type="text/postcss">
.headline {
    @apply text-gray-200 text-4xl text-center;
}

@screen sm {
    .headline {
        @apply text-6xl;
    }
}

.rotate {
  animation: rotation .2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>