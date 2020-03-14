<div class="flex flex-col pb-32">
    {#each sortedHistories as history,i (history.label.id)}
        <div in:fly={{duration:150, y:50, delay: 150}} out:fly={{duration:150, y:50}} class="mb-4 last:mb-0">
            <svelte:component this={labelComponent} data={history} on:delete={e => deleteLabel(e.detail)} />
        </div>
    {/each}
</div>

<svelte:window on:keydown={handleKeydown}/>

<script>
    import _ from "lodash";
    import axios from "axios";
    import ClickbaitLabel from "./label/Clickbait.svelte";
    import SummaryLabel from "./label/Summary.svelte";
    import { history, jwt, type } from "../stores.js";
    import { fly } from 'svelte/transition';
    import config from "../config.js";

    $: getHistories($type);
    $: sortedHistories = _.sortBy($history, function(label) {
            return Date.parse(label.label.updated_at); 
        }).reverse();
    $: labelComponent = $type == "clickbait" ? ClickbaitLabel : $type == "summary" ? SummaryLabel : null;

    async function getHistories(type) {
        if(!$jwt) return;
        $history = [];
        const url = `${config.baseUrl}/label/${type}`;
        const { data: histories, data: { error } } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${$jwt}`
            }
        });
        if(!error) $history = histories;
    }

    async function deleteLabel(labelID) {
        const url = `${config.baseUrl}/label/${$type}/${labelID}`
        const { data: { error }} = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${$jwt}`
            }
        });
        if(!error) await history.delete(labelID);
    }

    async function handleKeydown(event) {
        if(event.keyCode === 8 && sortedHistories.length) await deleteLabel(sortedHistories[0].id)
    }
</script>