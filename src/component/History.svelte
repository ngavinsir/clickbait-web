<div class="flex flex-col">
    {#each sortedHistories as history (history.id)}
        <Label label={history} />
    {/each}
</div>

<script>
    import _ from "lodash";
    import { onMount } from 'svelte';
    import axios from "axios";
    import Label from "./Label.svelte";
    import { history, jwt } from "../stores.js";

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
</script>