<div class="flex flex-col items-center">
  <span class="w-full headline leading-tight font-serif">{$article && $article.headline ? $article.headline : "No headline"}</span>
  <div class="flex">
    <span 
      class="text-accent-3 my-4 font-bold text-sm cursor-pointer"
      on:click={() => showContent = !showContent}
    >
      {`${showContent ? "HIDE" : "SHOW"} CONTENT`}
    </span>
    <span 
      class="text-white ml-8 my-4 font-bold text-sm cursor-pointer"
      on:click={() => dispatch("skip")} 
    >
      SKIP
    </span>
  </div>
  {#if showContent}
    <div class="content-wrapper">
      <p class="text-white mr-4">{$article && $article.content ? $article.content : "No content"}</p>
    </div>
  {/if}
</div>

<script>
    import { article, jwt, type } from "../stores.js";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let showContent = false;
</script>

<style type="text/postcss">
.headline {
    @apply text-gray-100 text-3xl text-center;
}

@screen sm {
    .headline {
        @apply text-5xl;
    }
}
.content-wrapper {
  max-height: 35vh;
  overflow-y: auto;
}
</style>