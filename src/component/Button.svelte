<button 
    class={`bt flex items-center justify-center ${customClass}`}
    on:click
    {disabled}
>
    {#if loading}
        <Spinner
          size="20"
          speed="750"
          color={spinnerColor || "#41da8f"}
          thickness="5"
          gap="40"
        />
    {:else}
        {value}
    {/if}
</button>

<script>
    import Spinner from 'svelte-spinner';

    export let disabled;
    export let value;
    export let loading;
    export let customClass;
    export let spinnerColor;
</script>