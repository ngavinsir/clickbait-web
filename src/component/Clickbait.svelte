<div class="flex content-around mt-8 flex-wrap justify-center">
    <button 
        class="bt gray w-32 sm:w-40 m-2 sm:mx-6 flex items-center justify-center" 
        on:click={() => sendLabel("NotClickbait")} 
        disabled={!article}
    >
        Not Clickbait
    </button>
    <button 
        class="bt white w-32 sm:w-40 m-2 sm:mx-6 flex items-center justify-center" 
        on:click={() => sendLabel("Clickbait")} 
        disabled={!article}
    >
        Clickbait
    </button>
</div>

<svelte:window on:keydown={handleKeydown}/>

<script>
    import axios from "axios";
    import { jwt, history, article } from "../stores.js";
    import config from "../config.js";

    async function sendLabel(label) {
        const url = `${config.baseUrl}/labeling/clickbait`;
        const data = {
            value: label,
            article_id: $article.id
        };
        const { data: { error, label_id, new_article } } = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${$jwt}`
            }
        })
        if(!error)  { 
            history.add({ 
                id: label_id,
                article: $article,
                label_value: label,
                label_updated_at: new Date().toISOString()
            })
        }
        $article = new_article;
    }

    async function handleKeydown(event) {
        if(event.keyCode === 65) await sendLabel("NotClickbait");
        else if(event.keyCode === 76) await sendLabel("Clickbait");
        else if(event.keyCode === 13) await getHeadline();
        else return;
    }
</script>


    