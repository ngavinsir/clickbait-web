<div class="flex flex-col items-center">
  {#if headline && renderHeadline}
    {#if loading}
      <div class="py-4">
        <Spinner  
          size="50"
          speed="750"
          color="#41da8f"
          thickness="3"
          gap="40"
        />
      </div>
    {:else}
      <span class="w-full headline leading-tight font-serif">
        {headline}
      </span>
    {/if}
  {/if}
  <div class="flex">
    <span 
      class="text-accent-3 my-4 font-bold text-sm cursor-pointer"
      on:click={() => showContent = !showContent}
    >
      {`${showContent ? "HIDE" : "SHOW"} CONTENT`}
    </span>
    <span 
      class="text-white ml-8 my-4 font-bold text-sm cursor-pointer"
      on:click={getArticle} 
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

<svelte:head>
    <title>{headline}</title>
</svelte:head>
<svelte:window on:keydown={handleKeydown}/>

<script>
    import Spinner from 'svelte-spinner';
    import { article, type, jwt } from "../stores.js";
    import { createEventDispatcher } from 'svelte';
    import { tick, beforeUpdate, getContext } from 'svelte';

    const { axios } = getContext("axios");
    const dispatch = createEventDispatcher();

    let showContent = false;
    let renderHeadline = true;
    let headline;
    let loading = false;

    $: getArticle($jwt);
    $: updateArticle($article);

    async function updateArticle(article) {
      renderHeadline = false;
      await tick();
      headline = article && article.headline ? article.headline : "No headline"
      renderHeadline = true;
    }

    async function handleKeydown(event) {
      if(event.keyCode === 13) await getArticle($jwt);
    }

    async function getArticle(jwt) {
      if(!$jwt) return;
      loading = true;
      const url = `/article/random/${$type}`;
      try {
          const { data, data: { error } } = await axios.get(url);
          $article = !error ? data : null;
      } catch (e) {
          console.log(e);
          // handle get article error
      } finally {
        loading = false;
      }
    }
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