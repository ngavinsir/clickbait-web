<div class="flex flex-col">
    {#each sortedHistories as history,i (history.label.id)}
        <div 
            in:fly={{duration:150, y:50}}
            out:fly={{duration:150, y:50}}
            animate:flip={{duration:150}} class="mb-4 last:mb-0">
            <svelte:component 
                this={labelComponent} 
                data={history} 
                on:delete={e => deleteLabel(e.detail)}
                deleting={deleting.includes(history.label.id)}
            />
        </div>
    {/each}
</div>

<svelte:window on:keydown={handleKeydown}/>

<script>
    import _ from "lodash";
    import ClickbaitLabel from "./label/Clickbait.svelte";
    import SummaryLabel from "./label/Summary.svelte";
    import { history, type } from "../stores.js";
    import { fly } from 'svelte/transition';
    import { flip } from "svelte/animate"
    import { getContext } from "svelte";

    const { axios } = getContext("axios");
    let deleting = [];

    $: getHistories($type);
    $: sortedHistories = _.sortBy($history, function(label) {
            return Date.parse(label.label.updated_at); 
        }).reverse();
    $: labelComponent = $type == "clickbait" ? ClickbaitLabel : $type == "summary" ? SummaryLabel : null;

    async function getHistories(type) {
        $history = [];
        const url = `/label/${type}`;
        const { data: histories, data: { error } } = await axios.get(url);
        if(!error) $history = histories;
    }

    async function deleteLabel(labelID) {
        deleting = [...deleting, labelID]
        const url = `/label/${$type}/${labelID}`
        try {
            const { data: { error }} = await axios.delete(url);
            if(!error) await history.delete(labelID);
        } catch (e) {
            console.log(e);
            // handle delete label error
        } finally {
            deleting = deleting.filter(d => d !== labelID);
        }
    }

    async function handleKeydown(event) {
        if(event.keyCode === 8 && sortedHistories.length) await deleteLabel(sortedHistories[0].label.id)
    }
</script>