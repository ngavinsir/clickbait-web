<div class="flex flex-col">
    {#each sortedHistories as history,i (history.id)}
        <div animate:flip={{duration:150}} transition:fade={{duration: 150}} class="mb-4 last:mb-0">
            <Label label={history} even={i%2 === 0} on:delete={e => deleteLabel(e.detail)}/>
        </div>
    {/each}
</div>

<svelte:window on:keydown={handleKeydown}/>

<script>
    import _ from "lodash";
    import { onMount } from 'svelte';
    import axios from "axios";
    import Label from "./Label.svelte";
    import { history, jwt } from "../stores.js";
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    $: getHistories($jwt);
    $: sortedHistories = _.sortBy($history, function(label) {
            return Date.parse(label.label_updated_at); 
        }).reverse();

    async function getHistories(jwt) {
        if(!$jwt) return;
        const url = `http://localhost:4040/label`;
        const { data: histories, data: { error } } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${$jwt}`
            }
        });
        if(!error) history.set(histories);
    }

    async function deleteLabel(labelID) {
        const url = `http://localhost:4040/label/${labelID}`
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