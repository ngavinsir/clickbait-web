<div class="flex flex-col pb-32">
    {#each sortedHistories as history,i (history.label.id)}
        <div animate:flip={{duration:150}} transition:fade={{duration: 150}} class="mb-4 last:mb-0">
            {#if $type == "clickbait"}
                <ClickbaitLabel data={history} on:delete={e => deleteLabel(e.detail)}/>
            {:else if $type == "summary"}
                <SummaryLabel data={history} on:delete={e => deleteLabel(e.detail)}/>
            {/if}
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
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import config from "../config.js";

    $: getHistories($type);
    $: sortedHistories = _.sortBy($history, function(label) {
            return Date.parse(label.label.updated_at); 
        }).reverse();

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