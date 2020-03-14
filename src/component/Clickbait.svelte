<div transition:fly={{duration:150, y:75}} class="footer">
    <Bt 
        customClass="gray hover:bg-dark-5 w-32 sm:w-40 m-2 sm:mx-6" 
        on:click={() => sendLabel("NotClickbait")}
        {loading}
        disabled={!article || loading}
        value="Not Clickbait"
    />
    <Bt
        customClass="white w-32 sm:w-40 m-2 sm:mx-6"
        on:click={() => sendLabel("Clickbait")}
        {loading}
        disabled={!article || loading}
        value="Clickbait"
    />
</div>

<svelte:window on:keydown={handleKeydown}/>

<script>
    import Bt from "./Button.svelte";
    import { getContext } from "svelte";
    import { history, article } from "../stores.js";
    import { fly } from "svelte/transition";

    const { axios } = getContext("axios");
    let loading = false;

    async function sendLabel(label) {
        loading = true;
        const url = `/labeling/clickbait`;
        const data = {
            value: label,
            article_id: $article.id
        };
        try {
            const { data: { error, label_id, new_article } } = await axios.post(url, data)
            if(!error)  { 
                history.add({ 
                    label: {
                        id: label_id,
                        value: label,
                        updated_at: new Date().toISOString()
                    },
                    article: $article,
                })
                $article = new_article;
            }
        } catch (e) {
            console.log(e);
            // handle send label error
        } finally {
            loading = false;
        }
    }

    async function handleKeydown(event) {
        if(event.keyCode === 65) await sendLabel("NotClickbait");
        else if(event.keyCode === 76) await sendLabel("Clickbait");
        else return;
    }
</script>


    