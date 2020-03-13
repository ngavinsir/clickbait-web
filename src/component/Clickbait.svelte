<div class="footer">
    <button 
        class="bt gray hover:bg-dark-5 w-32 sm:w-40 m-2 sm:mx-6 flex items-center justify-center" 
        on:click={() => sendLabel("NotClickbait")} 
        disabled={!article || loading}
    >
        Not Clickbait
    </button>
    <button 
        class="bt white w-32 sm:w-40 m-2 sm:mx-6 flex items-center justify-center" 
        on:click={() => sendLabel("Clickbait")} 
        disabled={!article || loading}
    >
        Clickbait
    </button>
</div>

<svelte:window on:keydown={handleKeydown}/>

<script>
    import axios from "axios";
    import { jwt, history, article } from "../stores.js";
    import config from "../config.js";

    let loading = false;

    async function sendLabel(label) {
        loading = true;
        const url = `${config.baseUrl}/labeling/clickbait`;
        const data = {
            value: label,
            article_id: $article.id
        };
        try {
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
                $article = new_article;
            }
        } catch (e) {
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


    