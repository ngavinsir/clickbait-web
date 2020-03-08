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

    async function handleKeydown(event) {
        if(event.keyCode === 65) await sendLabel("NotClickbait");
        else if(event.keyCode === 76) await sendLabel("Clickbait");
        else if(event.keyCode === 13) await getHeadline();
        else return;
    }

</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="flex flex-col items-center w-full">
    {#if $jwt}
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
            <button 
                class="w-16 m-2 sm:mx-6 text-white font-semibold text-base sm:text-lg hover:underline" 
                on:click={getHeadline} 
                disabled={!headline}
            >
                Next
            </button>
        </div>
    {:else}
        <h1 class="text-xl text-accent-5 font-semibold">login first</h1>
    {/if}
</div>

    

<style type="text/postcss">
.headline {
    @apply text-gray-100 text-3xl text-center;
}

@screen sm {
    .headline {
        @apply text-5xl;
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