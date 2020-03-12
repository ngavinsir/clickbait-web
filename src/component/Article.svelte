<span class="w-full headline leading-tight font-serif">{$article ? $article.headline : "No headline"}</span>

<script>
    import { article, jwt } from "../stores.js";
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

.rotate {
  animation: rotation .2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>