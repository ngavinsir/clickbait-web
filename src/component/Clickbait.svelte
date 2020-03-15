<div transition:slide={{duration:150}} class="footer">
    <Bt 
        customClass="gray w-32 sm:w-40 mx-2 my-1 sm:mx-6" 
        on:click={() => sendLabel("NotClickbait")}
        disabled={!article || loading}
        loading={loading === "NotClickbait"}
        value="Not Clickbait"
    />
    <Bt
        customClass="white w-32 sm:w-40 mx-2 my-1 sm:mx-6"
        on:click={() => sendLabel("Clickbait")}
        disabled={!article || loading}
        loading={loading === "Clickbait"}
        value="Clickbait"
    />
</div>

<svelte:window on:keydown={handleKeydown}/>

<script>
    import Bt from "./Button.svelte";
    import { getContext } from "svelte";
    import { history, article } from "../stores.js";
    import { slide } from "svelte/transition";

    const { axios } = getContext("axios");
    let loading = null;

    async function sendLabel(label) {
        loading = label;
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
            loading = null;
        }
    }

    async function handleKeydown(event) {
        if(event.keyCode === 65) await sendLabel("NotClickbait");
        else if(event.keyCode === 76) await sendLabel("Clickbait");
        else return;
    }
</script>


    